import { ProjectProps, ResourceProps } from "../../interfaces"

export function handleAddOrRemoveResourceToSelectedProject(
  newResource: any,
  projectState: ProjectProps | undefined,
  projects: ProjectProps[],
  setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
  setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
  handleRemoveResourceFromProject: (resourceId: number, projectId: number) => void,
  handleUpdateResourceHours: (resourceId: number, projectId: number, hours: number) => void
) {
    if (projectState) {
      const oldProjectSelected = { ...projectState };
      const currentResources = Array.isArray(
        oldProjectSelected.resources.projectResource
      )
        ? [...oldProjectSelected.resources.projectResource]
        : [];

      handleAddOrRemoveResourceToProjects(
          newResource,
          projectState,
          projects,
          setProjects,
          handleRemoveResourceFromProject,
          handleUpdateResourceHours
      );

        const addNewResource: ResourceProps = newResource[0];
        const resourceIndex = currentResources.findIndex(
          (pr) => pr.id === addNewResource.id
        );

        if (resourceIndex !== -1) {
          currentResources.splice(resourceIndex, 1);
        } else {
          currentResources.push(addNewResource);
        }
      

      oldProjectSelected.resources.projectResource = currentResources;
      setProjectState(oldProjectSelected);
    }
  }


    export function handleAddOrRemoveResourceToProjects(
    newResource: any,
    projectState: ProjectProps | undefined,
    projects: ProjectProps[],
    setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
    handleRemoveResourceFromProject: (resourceId: number, projectId: number) => void,
    handleUpdateResourceHours: (resourceId: number, projectId: number, hours: number) => void
  ) {
    if (projectState) {
      const oldProjects = [...projects];
      const currentProjectIndex = oldProjects.findIndex(
        (op) => op.id === projectState?.id
      );
      
      if (currentProjectIndex === -1) return;
      
      const currentProject = { ...oldProjects[currentProjectIndex] }; 

      const currentResources = Array.isArray(
        currentProject.resources.projectResource
      )
        ? [...currentProject.resources.projectResource]
        : [];

      const addNewResource: ResourceProps = newResource[0];
      const resourceIndex = currentResources.findIndex(
        (pr) => pr.id === addNewResource.id
      );

      if (resourceIndex !== -1) {
        handleRemoveResourceFromProject(addNewResource.id, projectState.id);
        currentResources.splice(resourceIndex, 1);
      } else {
        handleUpdateResourceHours(addNewResource.id, projectState.id, 0);
        currentResources.push(addNewResource);
      }

      currentProject.resources.projectResource = currentResources;
      oldProjects[currentProjectIndex] = currentProject;
      setProjects(oldProjects);
    }
  }