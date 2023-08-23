export type SummaryData = {
  title: string;
  indicator: string;
  statusDescription: string;
  incidents: Incident[];
  components: Component[];
};

export type Incident = {
  name: string;
  status: string;
  impact: string;
  componentId: string;
  started: string;
};

export type Component = {
  id: string;
  name: string;
  description?: string;
  status: string;

  children?: Component[];
};
