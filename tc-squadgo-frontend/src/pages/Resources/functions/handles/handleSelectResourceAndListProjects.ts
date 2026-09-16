import { api } from "../../../../services/api";
import { ResourceProjectsProps } from "../../interfaces";

export async function handleSelectResourceAndListProjects(
    resource_id: number,
    selectResourceId: number,
    setLoadingResourceProjectLists: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectResourceId: React.Dispatch<React.SetStateAction<number>>,
    setSelectResourceProjectLists: React.Dispatch<React.SetStateAction<ResourceProjectsProps | undefined>>
) {
    if (selectResourceId !== resource_id) {
        setLoadingResourceProjectLists(true)
        setSelectResourceId(resource_id)
        try {
            const response = await api.get(`/resources/${resource_id}/projects`)
            const resourceResponse = response.data;

            const resourceFormatted = {
                ...resourceResponse,
                projects: resourceResponse.projects.filter((p: any) => p.project.status === 'EM_ANDAMENTO')
            }

            setSelectResourceProjectLists(resourceFormatted)
            setLoadingResourceProjectLists(false)
        } catch (error) {
            console.error('Error fetching resource projects:', error)
            setLoadingResourceProjectLists(false)
        }
    }
}

