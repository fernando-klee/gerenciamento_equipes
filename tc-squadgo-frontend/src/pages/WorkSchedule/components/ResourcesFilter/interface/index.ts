interface ResourceProps {
    id: number
    name: string
    photo_url: string
}

export interface ResourcesFilterProps {
    resources: ResourceProps[]
}