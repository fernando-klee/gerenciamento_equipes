import { parseISO } from "date-fns";
import { api } from "../../../../services/api";
import { ProjectProps } from "../../interfaces";

export async function handleUpdateProject(
  values: any,
  projectState: ProjectProps | undefined,
  setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
  setProjectsFiltered: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
  setProjectHistoricSelected: React.Dispatch<React.SetStateAction<{ project_id: number; name: string }>>,
  setIsLoadingUpdating: React.Dispatch<React.SetStateAction<boolean>>,
  toast: any,
  onCloseUpdate: () => void
) {
  setIsLoadingUpdating(true);

  try {
    const { responsible_id } = values;

    const response = await api.put(`/projects/${projectState?.id}`, {
      ...values,
      responsible_id: responsible_id !== "0" ? responsible_id : null,
    });

    let end_estimate = null;
    if (response.data.end_estimate) {
      end_estimate = parseISO(response.data.end_estimate);
    }
    
    const newProjectUpdated = {
      ...response.data,
      start_estimate: parseISO(response.data.start_estimate + ""),
      end_estimate,
      uuid: projectState?.uuid,
    };
    
    setProjects(prev => {
      const updatedProjects = [...prev];
      const oldProjectIndex = updatedProjects.findIndex(
        (p) => p.id === newProjectUpdated.id
      );
      updatedProjects[oldProjectIndex] = newProjectUpdated;
      return updatedProjects;
    });

    setProjectsFiltered(prev => {
      const updatedFiltered = [...prev];
      const oldProjectIndex = updatedFiltered.findIndex(
        (p) => p.id === newProjectUpdated.id
      );
      updatedFiltered[oldProjectIndex] = newProjectUpdated;
      return updatedFiltered;
    });

    setProjectHistoricSelected({
      project_id: -1,
      name: "",
    });

    onCloseUpdate();

    toast({
      title: "Projeto atualizado com sucesso",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  } catch (err: any) {
    const { message } = err.response?.data || { message: "Ocorreu um erro" };
    
    toast({
      title: message,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  } finally {
    setIsLoadingUpdating(false);
  }
}