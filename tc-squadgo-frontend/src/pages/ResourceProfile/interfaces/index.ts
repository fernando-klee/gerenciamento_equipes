export interface ResourceProfileParams {
    resource_id: any
}

export interface ResourceProps {
    id: number
    name: string
    email: string
    photo_url: string
    leader_id: number
    resourceClassification: {
        classification: {
            description: string
        }
    }
}

export interface PayloadEntry {
    resource_id: boolean,
    nameOn: boolean,
    emailOn: boolean,
    roleOn: boolean,
    photoOn: boolean,
    timeInCompanyOn: boolean,
    educationOn: boolean,
    experiencesOn: boolean,
    hardSkillsOn: boolean,
    softSkillsOn: boolean
}

export interface ResourceProfileProps {
    children: React.ReactNode
}

export interface UseResourceProfileParams {
    resource_id: string;
    user: { id: string };
}