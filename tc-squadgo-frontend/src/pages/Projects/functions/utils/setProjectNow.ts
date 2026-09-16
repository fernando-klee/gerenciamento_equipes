import { api } from "../../../../services/api";
import { ProjectProps } from "../../interfaces";

export async function setProjectNow(
  project: ProjectProps,
  setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
  resetUpdateProjectModal: () => void,
  clearUpdateErrors: () => void,
  setValueUpdate: (name: string, value: any) => void,
  setIsLoadingProjectResources: React.Dispatch<React.SetStateAction<boolean>>
) {
  setProjectState(project);

  resetUpdateProjectModal();
  clearUpdateErrors();

  setValueUpdate("status", project.status);
  setValueUpdate("start_estimate", project.start_estimate);
  setValueUpdate("end_estimate", project.end_estimate);
  setValueUpdate("type", project.type);
  setValueUpdate("departure_forecast", project.departure_forecast);

  if (!project.has_loaded_resources) {
    setIsLoadingProjectResources(true);
    const response = await api.get(`/projects/${project.id}/resources`);
    project.resources = response.data;
    project.has_loaded_resources = true;
    setProjectState(project);
    setIsLoadingProjectResources(false);
  }
}