interface Resource {
    id: number
    name: string
    photo_url: string
}

export interface LeftResourcesProps {
    isLeader: string
    data: any
    resources: Resource[]
}