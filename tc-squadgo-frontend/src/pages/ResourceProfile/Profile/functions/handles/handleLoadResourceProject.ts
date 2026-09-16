import { api } from "../../../../../services/api"
import { ProjectProps } from "../../interfaces"

export async function handleLoadResourceProject(
    resource_id: string,
    setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
    setLoadingResourceProject: React.Dispatch<React.SetStateAction<boolean>>,
    toast: any
) {
            try {
                const response = await api.get(`/resources/${resource_id}/projects-historic`)
                setProjects(response.data)
            } catch (err) {
                toast({
                    title: 'Erro ao carregar projetos do colaborador',
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                })
            }
            setLoadingResourceProject(false)
    }