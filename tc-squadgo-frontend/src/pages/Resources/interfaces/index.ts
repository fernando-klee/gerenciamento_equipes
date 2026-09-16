export interface ResourceProjectsProps {
  resource_hours: number
  available_hours: number
  projects: {
    id: number
    hours_amount: number
    project: {
      id: number
      name: string
      customer: {
        id: number
        name: string
      }
    }
  }[]
}

export interface ResourceProjectStatusProps {
  isLoading: boolean
  resource_id: number
  projects_responsible: number
  projects_as_resource: number
}

export interface StatusResourceProps {
  id: number
  status: {
    id: number
    name: string
    description: string
  }
  substatus: {
    id: number
    name: string
    description: string
    color: string
  } | null
}

export interface ClassificationProps {
  id: number
  description: string
}

export interface ClassificationResourceProps {
  id: number
  classification: ClassificationProps
}

export interface TypesProps {
  id: number
  name: string
}

export interface HardSkillsProps {
  id: string
  description: string
  label: string
  value: string
}

export interface OutputProps {
  name: string
  photo_url: string
  output_estimate: Date | null
}

export interface LeaderProps {
  id: number
  name: string
  leader: boolean
  email: string
  photo_url: string
  status: string
  created_at: Date | null
  updated_at: Date | null
}

export interface ResourceProps {
  uuid1: string
  uuid2: string
  uuid3: string
  id: number
  name: string
  email: string
  leader: boolean
  leader_id: number
  photo_url: string
  has_projects: boolean
  resourceStatus: StatusResourceProps
  resourceClassification: ClassificationResourceProps | null
  hours_amount: number
  admission_date: Date,
  vacation_date: Date | null,
  backFromVacation: Date | null,
  departure_forecast: Date | null,
  hours_left: number
  __types__: TypesProps[]
  __hardSkills__: HardSkillsProps[]
}

interface ResourceStatusDescription {
  description: string
  color: string
}

export interface ResourcesTableProps {
  loadingResources: boolean
  resources: ResourceProps[]
  panelTitle: string
  loadingResourceProjectLists: boolean
  selectResourceProjectLists: ResourceProjectsProps | undefined
  resourceStatusDescription(status: string, hours_amount: number, classification?: string): ResourceStatusDescription
  selectResource(resource_id: number): void
  viewSelectedResource(resource_id: number): void
  handleSelectResourceAndListProjects(resource_id: number): void
}