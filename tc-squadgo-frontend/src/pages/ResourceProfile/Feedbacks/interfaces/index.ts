import { IconType } from "react-icons"

export interface FeedbackProps {
    id: number
    description: string
    type: 'CUSTOMER' | 'PERSONAL' | 'PROJECT' | 'RESOURCE'
    created_at: Date | string
    resource: {
        id: number
        name: string
    }
    reporter: {
        id: number
        name: string
    } | null
    project: {
        id: number
        name: string
    } | null
    customer: {
        id: number
        name: string
    } | null
}

export interface ProjectProps {
    customer: any
    id: number
    name: string
}

export interface CustomerProps {
    id: number
    name: string
}

export interface FeedbacksParams {
    resource_id: string
}

export interface FeedbackButtonProps {
    text: string
    type?: any
    icon: IconType
    iconSize?: number
}