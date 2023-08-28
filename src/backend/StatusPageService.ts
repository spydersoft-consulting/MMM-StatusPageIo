import fetch, { Response } from "node-fetch";
import { LogWrapper } from "../utilities/LogWrapper";
import { DataConfig } from "../types/Config";
import * as StatusPage from "../types/StatusPage";
import * as Display from "../types/Display";
import { ConvertComponentToDisplay, ConvertIncidentToDisplay } from "./DtoMappers";

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
        this.logger.info("Processing data");
        const incidents: Display.Incident[] = [];
        responseData.incidents.forEach((incident) => {
          if (!this.ignoreComponent(incident.components[0].id)) {
            incidents.push(ConvertIncidentToDisplay(incident));
          }
        });

        // If the component has an incident, it'll be shown above.
        const topLevelComponents = responseData.components.filter((comp) => comp.group_id === null && !this.hasIncident(incidents, comp) && !this.ignoreComponent(comp.id));

        const components: Display.Component[] = topLevelComponents.map((topComponent) => {
          const childComponents = responseData.components.filter((comp) => this.inGroup(comp, topComponent.id) && !this.hasIncident(incidents, comp) && !this.ignoreComponent(comp.id));
          const childComps = childComponents.map((comp) => ConvertComponentToDisplay(comp));

          return ConvertComponentToDisplay(topComponent, childComps);
        });

        const summaryData: Display.SummaryData = {
          title: responseData.page.name,
          indicator: responseData.status.indicator as Display.Impact,
          statusDescription: responseData.status.description,
          incidents: incidents,
          components: components
        };

        this.logger.info(`Sending Summary Data - Component Count ${summaryData.components.length}`);
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
