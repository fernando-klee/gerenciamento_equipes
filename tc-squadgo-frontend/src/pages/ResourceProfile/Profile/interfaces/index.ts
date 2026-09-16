export interface ResourceHistoric {
    id: number
    description: string
    type: string
    created_at: Date
}

export interface ResourceHistoricFilter {
    totalHistoric: number
    current_page: number
    last_page: number
    data: ResourceHistoric
}

export interface ResourceProfileParams {
    resource_id: string
}

export interface ProjectProps {
    id: number
    project: {
        id: number
        name: string
        status: string
        customer: {
            id: number
            name: string
            image_url: string
        }
        responsible: {
            id: number
            name: string
            photo_url: string
        }
    }
}

export interface ResourceProps {
    id: number
    name: string
    email: string
    photo_url: string
    status: string
    hours_amount: number
    created_at: Date
    admission_date: Date | null
    vacation_date: Date | null
    backFromVacation: Date | null
    resourceStatus: {
        status: {
            description: string
        }
        substatus: {
            description: string
        }
    }
}

export interface FeedbackProps {
    id: number
    description: string
    type: 'CUSTOMER' | 'PERSONAL' | 'PROJECT' | `RESOURCE`
    created_at: Date | string
    project: {
        id: number
        name: string
    } | null
    customer: {
        id: number
        name: string
    } | null
}