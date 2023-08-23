import fetch, { Response } from "node-fetch";
import { LogWrapper } from "../utilities/logging";
import { DataConfig } from "../types/config";
import { formatDistanceToNow } from "date-fns";
import * as StatusPage from "../types/statuspage";
import * as Display from "../types/display";

export class StatusPageService {
  pending: boolean = false;
  dataConfig: DataConfig;
  logger: LogWrapper;

  constructor(config: DataConfig, logger: LogWrapper) {
    this.dataConfig = config;
    this.logger = logger;
  }

  inGroup(comp: StatusPage.Component, group?: string) {
    return comp.group_id === group;
  }

  hasIncident(incidents: Display.Incident[], comp: StatusPage.Component) {
    return incidents.findIndex((inc) => inc.componentId === comp.id) !== -1;
  }

  ignoreComponent(compId: string): boolean {
    if (!this.dataConfig.componentsToIgnore || this.dataConfig.componentsToIgnore.length === 0) {
      return false;
    }
    return this.dataConfig.componentsToIgnore.findIndex((comp) => comp === compId) !== -1;
  }

  async getStatusPageIoSummary(): Promise<Display.SummaryData | undefined> {
    if (this.pending) {
      return;
    }
    this.pending = true;
    const url = "https://" + this.dataConfig.pageId + ".statuspage.io/api/v2/summary.json";
    return fetch(url, {
      method: "get"
    })
      .then(this.checkFetchStatus)
      .then((response) => response.json())
      .then((responseData: StatusPage.Summary) => {
        //Log.info("[MMM-StatusPageIo] - Processing data");
        const incidents: Display.Incident[] = [];
        responseData.incidents.forEach((incident) => {
          const startedAt = Date.parse(incident.started_at);
          if (!this.ignoreComponent(incident.components[0].id)) {
            incidents.push({
              name: incident.name,
              status: incident.status,
              impact: incident.impact,
              componentId: incident.components[0].id,
              started: formatDistanceToNow(startedAt, {})
            });
          }
        });

        // If the component has an incident, it'll be shown above.
        const topLevelComponents = responseData.components.filter((comp) => comp.group_id === null && !this.hasIncident(incidents, comp) && !this.ignoreComponent(comp.id));

        const components: Display.Component[] = topLevelComponents.map((topComponent) => {
          const childComponents = responseData.components.filter((comp) => this.inGroup(comp, topComponent.id) && !this.hasIncident(incidents, comp) && !this.ignoreComponent(comp.id));
          const childComps = childComponents.map((comp) => {
            return {
              id: comp.id,
              name: comp.name,
              description: comp.description,
              status: comp.status
            };
          });

          return {
            id: topComponent.id,
            name: topComponent.name,
            description: topComponent.description,
            status: topComponent.status,
            children: childComps
          };
        });

        const summaryData: Display.SummaryData = {
          title: responseData.page.name,
          indicator: responseData.status.indicator,
          statusDescription: responseData.status.description,
          incidents: incidents,
          components: components
        };

        this.logger.info("Sending Summary Data");
        return summaryData;
      })
      .catch((error) => {
        this.logger.error(error);
        return undefined;
      })
      .finally(() => {
        this.pending = false;
      });
  }

  checkFetchStatus(response: Response) {
    if (response.ok) {
      return response;
    } else {
      throw Error(response.statusText);
    }
  }
}
