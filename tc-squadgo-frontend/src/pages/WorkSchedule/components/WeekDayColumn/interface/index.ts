export interface WeekDayColumnProps {
    data: Day[]
    checkbox: boolean
    allResources: Resource[]
    allResourcesLeader: Resource[]
    onUpdateInfoInParent: (infoSchedule: string) => void
    onInfoScheduleChange: (infoSchedule: string) => void
    onRemoveInfoSchedule: (infoSchedule: string) => void
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
    resources?: Resource[]
}

export interface Resource {
    id: number
    name: string
    photo_url: string
}

export interface Leader {
    name: string
    resource_id: number
    photo_url: string
}

export interface Weekday {
    id: number
    name: string
}