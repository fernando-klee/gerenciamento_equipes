import { api } from "../../../../../services/api"
import { SkillProps } from "../../interfaces"

export async function handleLoadSkillPoints(
    resource_id: string,
    setSkills: React.Dispatch<React.SetStateAction<SkillProps[]>>,
    setSkillsChartFiltered: React.Dispatch<React.SetStateAction<SkillProps[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
        const response = await api.get(`/resources/${resource_id}/skills`)
        const responseSkills = response.data
        setSkills(responseSkills)
        setSkillsChartFiltered(responseSkills)
        setLoading(false)
    }