export interface Resource {
    id: number
    name: string
    photo_url: string
    leader?: boolean
    admission_date?: string
    email?: string
    resourceClassification?: {
      classification: {
        description: string
      }
    }
  }
  
  export interface Room {
    id: number
    name: string
    seats: number
    leaders: Leader[]
    resources: Resource[]
  }
  
  export interface Leader {
    name: string
    resource_id: number
    photo_url: string;
  }