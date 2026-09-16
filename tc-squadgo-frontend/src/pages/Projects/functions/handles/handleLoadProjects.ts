import { ProjectProps } from "../../interfaces";
import { parseISO } from "date-fns";
import queryString from "query-string";
import { api } from "../../../../services/api";
import { v4 } from 'uuid';

export async function handleLoadProjects(
  setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
  setProjectsFiltered: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
  setLoadingProjects: React.Dispatch<React.SetStateAction<boolean>>,
  search: string,
  setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
  resetUpdateProjectModal: () => void,
  clearUpdateErrors: () => void,
  setValueUpdate: (name: string, value: any) => void,
  onOpenView: () => void,
  setIsLoadingProjectResources: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any
) {
  try {
    const response = await api.get(`/projects`);
    const projectsWithUuid = response.data.map((p: ProjectProps) => {
      const start_estimate = parseISO(p.start_estimate + "");
      let end_estimate = null;
      if (p.end_estimate) end_estimate = parseISO(p.end_estimate + "");
      return {
        ...p,
        uuid: v4(),
        start_estimate,
        end_estimate,
        has_loaded_resources: false,
      };
    });
    
    setProjects(projectsWithUuid);
    setProjectsFiltered(projectsWithUuid);
    setLoadingProjects(false);

    const viewProject = queryString.parse(search);
    if (viewProject && viewProject.visualizar) {
      const project_id = Number(viewProject.visualizar);
      const currentProject = projectsWithUuid.find((p: ProjectProps) => p.id === project_id);

      if (currentProject) {
        setProjectState(currentProject);
        resetUpdateProjectModal();
        clearUpdateErrors();
        setValueUpdate("status", currentProject.status);
        setValueUpdate("start_estimate", currentProject.start_estimate);
        setValueUpdate("end_estimate", currentProject.end_estimate);
        setValueUpdate("type", currentProject.type);
        onOpenView();

        if (!currentProject.has_loaded_resources) {
          setIsLoadingProjectResources(true);
          const response = await api.get(
            `/projects/${currentProject.id}/resources`
          );
          currentProject.resources = response.data;
          currentProject.has_loaded_resources = true;
          setProjectState(currentProject);
          setIsLoadingProjectResources(false);
        }
      }
    }
  } catch (error) {
    toast({
      title: "Erro ao carregar projetos",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
}