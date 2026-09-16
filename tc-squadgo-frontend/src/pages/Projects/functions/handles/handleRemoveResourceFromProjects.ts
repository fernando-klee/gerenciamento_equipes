import { ProjectProps } from "../../interfaces";

export function handleRemoveResourceFromProjects(
          resource_id: number, 
          projectState: ProjectProps | undefined,
          projects: ProjectProps[],
          setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
          toast: any
) {
    try {
      if (projectState) {
        const oldProjects = [...projects];
        const currentProjectIndex = oldProjects.findIndex(
          (op) => op.id === projectState?.id
        );
        const currentProject = oldProjects[currentProjectIndex];

        const currentResources = [...currentProject.resources.projectResource];
        const currentResourceIndex = currentResources.findIndex(
          (cr) => cr.id === resource_id
        );
        currentResources.splice(currentResourceIndex, 1);

        currentProject.resources.projectResource = currentResources;
        oldProjects[currentProjectIndex] = currentProject;
        setProjects(oldProjects);

        toast({
          title: "Usuário deletado com sucesso!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao deletar usuário!",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }