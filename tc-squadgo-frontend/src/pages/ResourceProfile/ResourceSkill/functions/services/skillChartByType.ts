import { SkillProps } from "../../interfaces";

export function skillChartByType(type: string, skillsChartFiltered: SkillProps[]): SkillProps[] {
        return skillsChartFiltered.filter(f => f.skill.type === type)
    }