import { ProjectProps } from "../../interfaces";

export async function selectProject(
  project_id: number,
  projects: ProjectProps[],
  setProjectNow: Function, 
  setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
  resetUpdateProjectModal: any,
  clearUpdateErrors: any,
  setValueUpdate: any,
  setIsLoadingProjectResources: React.Dispatch<React.SetStateAction<boolean>>,
  onOpenUpdate: () => void
) {
  const currentProjects = [...projects];
  const currentProject = currentProjects.find((p) => p.id === project_id);

  if (currentProject) {
    setProjectNow(
      currentProject,
      setProjectState,
      resetUpdateProjectModal,
      clearUpdateErrors,
      setValueUpdate,
      setIsLoadingProjectResources
    );
  }
  onOpenUpdate();
}