export interface ResourceProjectsProps {
  resource_hours: number;
  available_hours: number;
  projects: {
    id: number;
    hours_amount: number;
    project: {
      id: number;
      name: string;
      status: string;
      customer: {
        id: number;
        name: string;
      };
    };
  }[];
}

export interface ResourceProps {
  id: number;
  name: string;
  email: string;
  photo_url: string;
}

export interface CustomerProps {
  id: number;
  created_at: Date;
  name: string;
  status: string;
  image_url: string;
  hired_hours: number;
  resources: ResourceProps[];
  responsibles: ResourceProps[];
}

export interface TopDataProps {
  resourcesAvailable: number;
  realNecessity: number;
  plannedNecessity: number;
  plannedRelease: number;
}

export interface GeralVisionProps {
  allResourcesHours: number;
  totalHoursHappeningWithoutExceeds: number;
  totalExcededHours: number;
  totalHoursHappening: number;
  allProjectsHours: number;
}

export interface DisponibilityDataProps {
  totalAvailableHours: number;
  totalMissingHours: number;
  totalDisponibilityHoursToHappen: number;
  allHoursActivesProjects: number;
}

export interface AllValuesProps {
  topDash: TopDataProps;
  disponibility: DisponibilityDataProps;
  geralVision: GeralVisionProps;
}

export interface PlannedReleaseProps {
  name: string;
  photo_url: string;
  output_estimate: Date | null;
}

