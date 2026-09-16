export interface ResourceDayOfWeekProps {
    id: number
    name: string
    photo_url: string
}

export interface RoomDayOfWeekProps {
    id: number
    name: string
    seats: number
    resources: ResourceDayOfWeekProps[]
}

export interface ResourceRoomDayOfWeekProps {
    id: number
    day: string
    rooms: RoomDayOfWeekProps[]
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
    leaders?: Leader[]
    resources: Resource[]
}

export interface Resource {
    id: number
    name: string
    photo_url: string
    status?: string
}

export interface Leader {
    name: string
    resource_id: number
    photo_url: string
}


export interface Weekday {
    id: number
    name: string
    rooms: Room[]
}

export interface PayloadEntry {
    week_day: number
    room_id: number
    month: number
    resource_id: number
}