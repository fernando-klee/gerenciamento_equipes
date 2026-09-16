export interface ResourceArrayProps {
  projectResource: ResourceProps[];
  totalHoursAmount: number;
}

export interface ResourceProps {
  id: number;
  name: string;
  photo_url: string;
  hours_amount: number;
  hours_left: number;
  project_hours: number;
  label: string;
  value: number;
  status?: string;
  totalHoursAmount: number;
  departure_forecast: Date | null;
}

export interface CustomerProps {
  id: number;
  name: string;
  image_url: string;
  label: string;
  value: number;
  status: string;
}

export interface ProjectProps {
  uuid: string;
  id: number;
  name: string;
  hours: number;
  type: string;
  status: string;
  start_estimate: Date;
  end_estimate: Date | null;
  created_at: Date;
  departure_forecast: Date | null;
  customer: CustomerProps;
  responsible: ResourceProps;
  resources_length: number;
  has_loaded_resources: boolean;
  resources: ResourceArrayProps;
}

export interface ProjectState {
  project: ProjectProps | null;
  lastValue: number;
}

export type HistoricTypeProps =
  | "NEW_PROJECT"
  | "NAME"
  | "HOURS"
  | "TYPE"
  | "STATUS"
  | "START_ESTIMATE"
  | "RESPONSIBLE_ID"
  | "CUSTOMER_ID"
  | "RESOURCE"
  | "RESOURCE_HOURS";

export interface HistoricProps {
  uuid: string;
  id: number;
  description: string;
  type: HistoricTypeProps;
  created_at: Date;
}