import { parseISO } from "date-fns";
import { v4 } from "uuid";
import { api } from "../../../../services/api";
import { ProjectProps, ResourceProps } from "../../interfaces";

export async function handleCreateNewProject(
  values: any,
  switchEstimate: boolean,
  newProjectResources: ResourceProps[],
  setProjects: (updater: (prev: ProjectProps[]) => ProjectProps[]) => void,
  setProjectsFiltered: (updater: (prev: ProjectProps[]) => ProjectProps[]) => void,
  setIsLoadingCreating: (loading: boolean) => void,
  toast: any,
  closeModal: () => void
) {
  setIsLoadingCreating(true);
  
  try {
    const { responsible_id } = values;
    
    const currentResources = newProjectResources.map((r: ResourceProps) => {
      return {
        resource_id: r.id,
        hours_amount: r.project_hours,
      };
    });

    const response = await api.post("/projects", {
      ...values,
      responsible_id: responsible_id !== "0" ? responsible_id : null,
      resources: currentResources,
    });

    if (!switchEstimate) {
      const start_estimate = parseISO(response.data.start_estimate);
      let end_estimate = null;
      if (response.data.end_estimate) {
        end_estimate = parseISO(response.data.end_estimate);
      }
      
      const newProjectCreated: ProjectProps = {
        ...response.data,
        start_estimate,
        end_estimate,
        uuid: v4(),
        has_loaded_resources: false,
        resources: {
          projectResource: [],
          totalHoursAmount: 0
        }
      };
      
      setProjects(prev => [...prev, newProjectCreated]);
      setProjectsFiltered(prev => [...prev, newProjectCreated]);
    } else {
      let end_estimate = null;
      if (response.data.end_estimate) {
        end_estimate = parseISO(response.data.end_estimate);
      }
      
      const newProjectCreated: ProjectProps = {
        ...response.data,
        end_estimate,
        uuid: v4(),
        has_loaded_resources: false,
        resources: {
          projectResource: [],
          totalHoursAmount: 0
        }
      };
      
      setProjects(prev => [...prev, newProjectCreated]);
      setProjectsFiltered(prev => [...prev, newProjectCreated]);
    }

    toast({
      title: "Projeto cadastrado com sucesso",
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    closeModal();
  } catch (err: any) {
    const { message } = err.response?.data || { message: "Ocorreu um erro" };
    
    toast({
      title: message,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  } finally {
    setIsLoadingCreating(false);
  }
}