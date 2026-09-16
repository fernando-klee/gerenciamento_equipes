import { SkillProps } from "../../interfaces"

export function handleSetSkillChartFilters(
    id: number,
    skills: SkillProps[],
    skillsChartFiltered: SkillProps[],
    setSkillsChartFiltered: React.Dispatch<React.SetStateAction<SkillProps[]>>
) {
        const oldSkills = [...skills]
        const oldSkillsChart = [...skillsChartFiltered]

        const containsIndex = oldSkillsChart.findIndex(osc => osc.skill.id === id)
        if (containsIndex === -1) {
            const currentSkillChartIndex = oldSkills.findIndex(os => os.skill.id === id)
            const currentSkillChart = oldSkills[currentSkillChartIndex]
            oldSkillsChart.push(currentSkillChart)
        } else {
            oldSkillsChart.splice(containsIndex, 1)
        }

        setSkillsChartFiltered(oldSkillsChart)
    }