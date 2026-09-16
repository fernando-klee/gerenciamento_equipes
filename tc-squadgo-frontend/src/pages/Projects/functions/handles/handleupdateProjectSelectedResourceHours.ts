import { ProjectProps } from "../../interfaces";
import { api } from "../../../../services/api";

export async function handleUpdateProjectSelectedResourceHours(
    resource_id: number,
    projectState: ProjectProps | undefined,
    projects: ProjectProps[],
    setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
    setIsLoadingUpdateResourceHours: React.Dispatch<React.SetStateAction<number>>,
    toast: any
) {
    if (projectState) {
      setIsLoadingUpdateResourceHours(resource_id);
      const projectSelectedResources = [
        ...projectState.resources.projectResource,
      ];
      const resourceIndex = projectSelectedResources.findIndex(
        (psr) => psr.id === resource_id
      );
      const currentProjectResourceSelected =
        projectSelectedResources[resourceIndex];

      const oldProjects = [...projects];
      const currentProjectIndex = oldProjects.findIndex(
        (op) => op.id === projectState.id
      );
      const currentProject = oldProjects[currentProjectIndex];
      const currentProjectResources = currentProject.resources;
      const currentResourceIndex =
        currentProjectResources.projectResource.findIndex(
          (cpr) => cpr.id === resource_id
        );
      const currentResource =
        currentProjectResources.projectResource[currentResourceIndex];

      const hours_left =
        currentResource.hours_left -
        (currentProjectResourceSelected.project_hours -
          currentResource.project_hours);
      const project_hours = currentProjectResourceSelected.project_hours;

      currentResource.hours_left = hours_left;
      currentResource.project_hours = project_hours;

      currentProjectResources.projectResource[currentResourceIndex] =
        currentResource;

      currentProject.resources = currentProjectResources;

      oldProjects[currentProjectIndex] = currentProject;
      setProjects(oldProjects);
      await handleUpdateResourceHours(
        resource_id,
        projectState.id,
        project_hours
      );
      setIsLoadingUpdateResourceHours(-1);
      toast({
        title: "horas do colaborador atualizada!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  }

export async function handleUpdateResourceHours(
    resource_id: number,
    project_id: number,
    project_hours: number
) {
    await api.patch(`/projects/${project_id}/resources/${resource_id}/hours`, {
        hours_amount: project_hours,
    });
}