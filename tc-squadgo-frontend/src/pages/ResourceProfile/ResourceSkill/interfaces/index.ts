export interface ResourceProfileParams {
    resource_id: string
}

export interface SkillProps {
    skill: {
        id: number
        description: string
        type: 'HARD' | 'SOFT'
    }
    point: number
}