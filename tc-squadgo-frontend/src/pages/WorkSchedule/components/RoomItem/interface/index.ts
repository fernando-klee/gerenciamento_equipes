export interface RoomItemProps {
    roomName: string
    homeOffice?: boolean
    seats?: any
    avatar?: boolean
    filled?: any
    resources: Resource[]
    visibleCount?: boolean
    visibleSeats?: boolean
    data: Day
    idRoom: any
    allResources: Resource[]
    onUpdateInfoInParent: (infoSchedule: string) => void
}

export interface StatusResourceProps {
    id: number
    description: string
    name: string
}

export interface StatusProps {
    id: number
    status: StatusResourceProps
}

export interface Day {
    id: number
    name: string
    rooms: Room[]
}

export interface Room {
    id: number
    name: string
    seats: number
    resources?: Resource[]
}
export interface Resource {
    id: number
    name: string
    photo_url: string
    resourceStatus: StatusProps
    roomResourceWeekdayId?: number
}