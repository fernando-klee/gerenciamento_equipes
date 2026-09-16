export interface LeaderFilterProps {
    rooms: any
    selectedOption: string
    checkbox: any
}

export interface Resource {
    id: number
    name: string
    photo_url: string
    leader: boolean
}

export interface Day {
    id: number
    day: string
    rooms: Room[]
}

export interface Room {
    id: number
    name: string
    seats: number
    resources: Resource[]
}