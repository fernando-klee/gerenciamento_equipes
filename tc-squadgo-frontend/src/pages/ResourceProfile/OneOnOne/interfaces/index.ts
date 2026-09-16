import { IconType } from "react-icons"

export interface OneOnOneProps {
    id: number
    description: string
    type: 'LEADER' | 'RESOURCE'
    leaderId: number
    resourceId: number
    createdAt: string
    updatedAt: string
    leaderName: string
}

export interface OneOnOneParams {
    resource_id: string
}

export interface OneOnOneButtonProps {
    text: string
    type?: any
    icon: IconType
    iconSize?: number
    isActive: boolean;
    onClick: () => void;
}
