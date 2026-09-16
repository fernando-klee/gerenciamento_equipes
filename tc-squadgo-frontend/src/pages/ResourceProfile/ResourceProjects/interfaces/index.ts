export interface Resource {
    id: number;
    name: string;
    photo_url: string;
}

export interface ProjectProps {
    id: number
    created_at: Date | string
    project: {
        id: number
        name: string
        status: string
        start_estimate: Date | string
        end_estimate: Date | string | null
        conclusion_date: Date | string | null
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
        resources: Resource[];
    }
}

export interface ResourceProfileParams {
    resource_id: string
}