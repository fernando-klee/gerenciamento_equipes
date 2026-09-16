import { api } from "../../../../services/api";
import { ProjectProps } from "../../interfaces";

export async function handleRemoveResourceFromSelectedProject(
  resource_id: number,
  projectState: ProjectProps | undefined,
  projects: ProjectProps[],
  setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
  setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
  toast: any,
  onCloseDelete: () => void
) {
  if (!projectState) return;

  try {
    await api.delete(`/projects/${projectState.id}/resources/${resource_id}`);
    
    const updatedProjects = projects.map(project => {
      if (project.id === projectState.id) {
        const updatedResources = project.resources.projectResource.filter(
          resource => resource.id !== resource_id
        );
        
        return {
          ...project,
          resources: {
            ...project.resources,
            projectResource: updatedResources,
            totalHoursAmount: updatedResources.reduce(
              (sum, resource) => sum + resource.project_hours, 0
            )
          }
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    
    const updatedResources = projectState.resources.projectResource.filter(
      resource => resource.id !== resource_id
    );
    
    setProjectState({
      ...projectState,
      resources: {
        ...projectState.resources,
        projectResource: updatedResources,
        totalHoursAmount: updatedResources.reduce(
          (sum, resource) => sum + resource.project_hours, 0
        )
      }
    });

    toast({
      title: "Usuário removido com sucesso!",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    
    onCloseDelete();
    
  } catch (err: any) {
    const { message } = err.response?.data || { message: "Erro ao remover usuário!" };
    
    toast({
      title: message,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
}