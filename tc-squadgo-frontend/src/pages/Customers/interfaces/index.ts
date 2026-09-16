export interface CustomerProps {
  id: number
  created_at: Date
  name: string
  status: string
  image_url: string
  hired_hours: number
  resource_profile: string,
  start_contract_time: Date,
  end_contract_time: Date,
  responsible_name: string,
  responsible_email: string,
  responsible_phone: string,
  objective: string
}

export interface CustomerProjectsProps {
    customer_id: number
    projects: {
        id: number
        name: string
    }[]
    isLoading: boolean
}


export interface FilterProps {
    name: string;
    qtdPerPage: number;
    currentPage: number;
}