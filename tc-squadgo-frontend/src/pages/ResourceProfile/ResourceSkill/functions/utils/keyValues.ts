import { SkillProps } from "../../interfaces"
import { skillChartByType } from "../services/skillChartByType"

export function keyValues(
    type: string,
    skillsChartFiltered: SkillProps[]
): any[] {
        let skills = skillChartByType(type, skillsChartFiltered).map((s, i) => {
            return {
                'skill': s.skill.description,
                'Pontuação': s.point
            }
        })

        return skills
    }