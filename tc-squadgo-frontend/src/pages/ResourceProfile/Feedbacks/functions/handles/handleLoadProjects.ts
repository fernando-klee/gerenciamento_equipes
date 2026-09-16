import { api } from "../../../../../services/api"
import { ProjectProps } from "../../interfaces"

export async function handleLoadProjects(
    setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
    setIsLoadingProjects: React.Dispatch<React.SetStateAction<boolean>>
) {
            const response = await api.get(`/projects`)
            setProjects(response.data)
            setIsLoadingProjects(false)
        }
