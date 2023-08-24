export enum IncidentStatus {
  INVESTIGATING = "investigating",
  SCHEDULED = "scheduled",
  IDENTIFIED = "identified",
  MONITORING = "monitoring",
  RESOLVED = "resolved",
  POSTMORTEM = "postmortem"
}

export enum Impact {
  CRITICAL = "critical",
  MAINTENANCE = "maintenance",
  MAJOR = "major",
  MINOR = "minor"
}

export enum ComponentStatus {
  MAINTENANCE = "under_maintenance",
  MAJOR_OUTAGE = "major_outage",
  PARTIAL_OUTAGE = "partial_outage",
  DEGRADED = "degraded_performance",
  OPERATIONAL = "operational"
}

export type SummaryData = {
  title: string;
  indicator: Impact;
  statusDescription: string;
  incidents: Incident[];
  components: Component[];
};

export type Incident = {
  name: string;
  status: IncidentStatus;
  impact: Impact;
  componentId: string;
  started: string;
};

export type Component = {
  id: string;
  name: string;
  description?: string;
  status: ComponentStatus;

  children?: Component[];
};
