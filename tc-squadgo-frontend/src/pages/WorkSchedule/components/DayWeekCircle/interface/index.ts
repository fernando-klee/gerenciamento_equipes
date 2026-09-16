interface Resource {
    id: number
    name: string
    photo_url: string
}

interface Leader {
    name: string
    resource_id: number
    photo_url: string
}

export interface DayWeekCircleProps {
    roomName: string
    homeOffice?: boolean
    seats?: any
    avatar?: boolean
    filled?: any
    resources: Resource[]
    visibleCount?: boolean
    visibleSeats?: boolean
    leaders: Leader[]
}