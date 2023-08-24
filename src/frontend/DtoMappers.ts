import * as Display from "../types/display";
import * as StatusPage from "../types/statuspage";
import { formatDistanceToNow } from "date-fns";

export const ConvertIncidentToDisplay = (incident: StatusPage.Incident): Display.Incident => {
  return {
    name: incident.name,
    status: incident.status as Display.IncidentStatus,
    impact: incident.impact as Display.Impact,
    componentId: incident.components[0].id,
    started: formatDistanceToNow(Date.parse(incident.started_at), {})
  };
};

export const ConvertComponentToDisplay = (component: StatusPage.Component, children?: Display.Component[]): Display.Component => {
  return {
    id: component.id,
    name: component.name,
    description: component.description,
    status: component.status as Display.ComponentStatus,
    children: children
  };
};
