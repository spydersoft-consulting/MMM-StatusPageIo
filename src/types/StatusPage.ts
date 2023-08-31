export type Component = {
  id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  position: number;
  description?: string;
  showcase: boolean;
  start_date: string;
  group_id: string;
  page_id: string;
  group: boolean;
  only_show_if_degrated: boolean;
};

export type Incident = {
  id: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  monitoring_at: string;
  resolved_at: string;
  impact: string;
  shortlink: string;
  started_at: string;
  page_id: string;
  incident_updates: IncidentUpdate[];

  components: Component[];
};

export type IncidentUpdate = {
  id: string;
  status: string;
  body: string;
  incident_id: string;
  created_at: string;
  updated_at: string;
  display_at: string;
  deliver_notifications: boolean;
  custom_tweet?: string;
  tweet_id?: string;

  affected_components: AffectedComponent[];
};

export type AffectedComponent = {
  code: string;
  name: string;
  old_status: string;
  new_status: string;
};

export type Maintenance = Incident & {
  scheduled_for: string;
  scheduled_until: string;
};

export type Status = {
  indicator: string;
  description: string;
};

export type Page = {
  id: string;
  name: string;
  url: string;
  time_zone: string;
  updated_at: string;
};

export type Summary = {
  page: Page;
  status: Status;
  components: Component[];
  incidents: Incident[];
  scheduled_maintenances: Maintenance[];
};
