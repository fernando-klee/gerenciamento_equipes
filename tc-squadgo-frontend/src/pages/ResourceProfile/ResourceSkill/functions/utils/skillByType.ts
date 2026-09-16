import { SkillProps } from "../../interfaces";

export function skillByType (type: string, skills: SkillProps[]): SkillProps[] {
        return skills.filter(f => f.skill.type === type)
    }