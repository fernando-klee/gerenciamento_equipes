interface Resource {
    id: number
    name: string
    photo_url: string
    leader: boolean
}

export interface DayWeekProps {
    nameDayOfWeek: string
    seats?: number
    filled?: any
    homeOffice?: boolean
    roomName: string
    resources: Resource[]
    visibleCount?: boolean
    visibleSeats?: boolean
}