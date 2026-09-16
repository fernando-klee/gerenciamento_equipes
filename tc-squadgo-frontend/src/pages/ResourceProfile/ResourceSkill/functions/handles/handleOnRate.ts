import { api } from "../../../../../services/api"
import { SkillProps } from "../../interfaces" 

export async function handleOnRate(
    id: number, 
    point: number,
    skills: SkillProps[],
    setSkills: React.Dispatch<React.SetStateAction<SkillProps[]>>,
    setSkillsChartFiltered: React.Dispatch<React.SetStateAction<SkillProps[]>>,
    resource_id: string
) {
        const oldSkills = [...skills]
        const skillIndex = oldSkills.findIndex(s => s.skill.id === id)
        const skill = oldSkills[skillIndex]

        if (skill.point === point) skill.point = skill.point - 1
        else skill.point = point

        oldSkills[skillIndex] = skill
        setSkills(oldSkills)
        setSkillsChartFiltered(oldSkills)

        await api.put(`/resources/${resource_id}/skills`, {
            point: skill.point,
            skill_id: id
        })

    }