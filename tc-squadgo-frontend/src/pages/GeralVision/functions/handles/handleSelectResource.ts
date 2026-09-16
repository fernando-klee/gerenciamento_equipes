import { api } from "../../../../services/api";
import { ResourceProjectsProps } from "../../interfaces";

export async function handleSelectResource(
    resource_id: number,
    selectedResource: number,
    setLoadingResourceProjects: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedResource: React.Dispatch<React.SetStateAction<number>>,
    setSelectedResourceProject: React.Dispatch<React.SetStateAction<ResourceProjectsProps | undefined>>
) {
    if (selectedResource !== resource_id) {
      setLoadingResourceProjects(true);
      setSelectedResource(resource_id);
      const response = await api.get(`/resources/${resource_id}/projects`);
      const resourceResponse = response.data;

      const resourceFormatted = {
        ...resourceResponse,
        projects: resourceResponse.projects.filter(
          (p: any) => p.project.status == "EM_ANDAMENTO"
        ),
      };

      setSelectedResourceProject(resourceFormatted);
      setLoadingResourceProjects(false);
    }
  }