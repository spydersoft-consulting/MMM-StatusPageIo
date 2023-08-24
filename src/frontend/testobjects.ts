import * as Display from "../types/display";

const baseProps = {
  componentId: "test",
  started: "1h ago"
};

export const InvestigatingCriticalIncident: Display.Incident = {
  name: "Investigating Critical Incident",
  status: Display.IncidentStatus.INVESTIGATING,
  impact: Display.Impact.CRITICAL,
  ...baseProps
};

export const InvestigatingMajorIncident: Display.Incident = {
  name: "Investigating Major Incident",
  status: Display.IncidentStatus.INVESTIGATING,
  impact: Display.Impact.MAJOR,
  ...baseProps
};

export const InvestigatingMinorIncident: Display.Incident = {
  name: "Investigating Minor Incident",
  status: Display.IncidentStatus.INVESTIGATING,
  impact: Display.Impact.MINOR,
  ...baseProps
};

export const InvestigatingMaintenanceIncident: Display.Incident = {
  name: "Investigating Maintenance Incident",
  status: Display.IncidentStatus.INVESTIGATING,
  impact: Display.Impact.MAINTENANCE,
  ...baseProps
};

export const InvestigatingIncident: Display.Incident = {
  name: "Investigating Incident",
  status: Display.IncidentStatus.INVESTIGATING,
  impact: Display.Impact.NONE,
  ...baseProps
};

export const IdentifiedCriticalIncident: Display.Incident = {
  name: "Identified Critical Incident",
  status: Display.IncidentStatus.IDENTIFIED,
  impact: Display.Impact.CRITICAL,
  ...baseProps
};

export const IdentifiedMajorIncident: Display.Incident = {
  name: "Identified Major Incident",
  status: Display.IncidentStatus.IDENTIFIED,
  impact: Display.Impact.MAJOR,
  ...baseProps
};

export const IdentifiedMinorIncident: Display.Incident = {
  name: "Identified Minor Incident",
  status: Display.IncidentStatus.IDENTIFIED,
  impact: Display.Impact.MINOR,
  ...baseProps
};

export const IdentifiedMaintenanceIncident: Display.Incident = {
  name: "Identified Maintenance Incident",
  status: Display.IncidentStatus.IDENTIFIED,
  impact: Display.Impact.MAINTENANCE,
  ...baseProps
};

export const IdentifiedIncident: Display.Incident = {
  name: "Identified Incident",
  status: Display.IncidentStatus.IDENTIFIED,
  impact: Display.Impact.NONE,
  ...baseProps
};

export const MonitoringCriticalIncident: Display.Incident = {
  name: "Monitoring Critical Incident",
  status: Display.IncidentStatus.MONITORING,
  impact: Display.Impact.CRITICAL,
  ...baseProps
};

export const MonitoringMajorIncident: Display.Incident = {
  name: "Monitoring Major Incident",
  status: Display.IncidentStatus.MONITORING,
  impact: Display.Impact.MAJOR,
  ...baseProps
};

export const MonitoringMinorIncident: Display.Incident = {
  name: "Monitoring Minor Incident",
  status: Display.IncidentStatus.MONITORING,
  impact: Display.Impact.MINOR,
  ...baseProps
};

export const MonitoringMaintenanceIncident: Display.Incident = {
  name: "Monitoring Maintenance Incident",
  status: Display.IncidentStatus.MONITORING,
  impact: Display.Impact.MAINTENANCE,
  ...baseProps
};

export const MonitoringIncident: Display.Incident = {
  name: "Monitoring Incident",
  status: Display.IncidentStatus.MONITORING,
  impact: Display.Impact.NONE,
  ...baseProps
};

export const ResolvedCriticalIncident: Display.Incident = {
  name: "Resolved Critical Incident",
  status: Display.IncidentStatus.RESOLVED,
  impact: Display.Impact.CRITICAL,
  ...baseProps
};

export const ResolvedMajorIncident: Display.Incident = {
  name: "Resolved Major Incident",
  status: Display.IncidentStatus.RESOLVED,
  impact: Display.Impact.MAJOR,
  ...baseProps
};

export const ResolvedMinorIncident: Display.Incident = {
  name: "Resolved Minor Incident",
  status: Display.IncidentStatus.RESOLVED,
  impact: Display.Impact.MINOR,
  ...baseProps
};

export const ResolvedMaintenanceIncident: Display.Incident = {
  name: "Resolved Maintenance Incident",
  status: Display.IncidentStatus.RESOLVED,
  impact: Display.Impact.MAINTENANCE,
  ...baseProps
};

export const ResolvedIncident: Display.Incident = {
  name: "Resolved Incident",
  status: Display.IncidentStatus.RESOLVED,
  impact: Display.Impact.NONE,
  ...baseProps
};

export const ScheduledCriticalIncident: Display.Incident = {
  name: "Scheduled Critical Incident",
  status: Display.IncidentStatus.SCHEDULED,
  impact: Display.Impact.CRITICAL,
  ...baseProps
};

export const ScheduledMajorIncident: Display.Incident = {
  name: "Scheduled Major Incident",
  status: Display.IncidentStatus.SCHEDULED,
  impact: Display.Impact.MAJOR,
  ...baseProps
};

export const ScheduledMinorIncident: Display.Incident = {
  name: "Scheduled Minor Incident",
  status: Display.IncidentStatus.SCHEDULED,
  impact: Display.Impact.MINOR,
  ...baseProps
};

export const ScheduledMaintenanceIncident: Display.Incident = {
  name: "Scheduled Maintenance Incident",
  status: Display.IncidentStatus.SCHEDULED,
  impact: Display.Impact.MAINTENANCE,
  ...baseProps
};

export const ScheduledIncident: Display.Incident = {
  name: "Scheduled Incident",
  status: Display.IncidentStatus.SCHEDULED,
  impact: Display.Impact.NONE,
  ...baseProps
};

export const PostmortemCriticalIncident: Display.Incident = {
  name: "Postmortem Critical Incident",
  status: Display.IncidentStatus.POSTMORTEM,
  impact: Display.Impact.CRITICAL,
  ...baseProps
};

export const PostmortemMajorIncident: Display.Incident = {
  name: "Postmortem Major Incident",
  status: Display.IncidentStatus.POSTMORTEM,
  impact: Display.Impact.MAJOR,
  ...baseProps
};

export const PostmortemMinorIncident: Display.Incident = {
  name: "Postmortem Minor Incident",
  status: Display.IncidentStatus.POSTMORTEM,
  impact: Display.Impact.MINOR,
  ...baseProps
};

export const PostmortemMaintenanceIncident: Display.Incident = {
  name: "Postmortem Maintenance Incident",
  status: Display.IncidentStatus.POSTMORTEM,
  impact: Display.Impact.MAINTENANCE,
  ...baseProps
};

export const PostmortemIncident: Display.Incident = {
  name: "Postmortem Incident",
  status: Display.IncidentStatus.POSTMORTEM,
  impact: Display.Impact.NONE,
  ...baseProps
};
