import { ProjectProps } from "../../interfaces";

export async function viewSelectedProject(
  project_id: number,
  projects: ProjectProps[],
  setProjectNow: Function,
  setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
  resetUpdateProjectModal: () => void,
  clearUpdateErrors: () => void,
  setValueUpdate: (name: string, value: any) => void,
  setIsLoadingProjectResources: React.Dispatch<React.SetStateAction<boolean>>,
  onOpenView: () => void
) {
  const currentProject = projects.find((p) => p.id === project_id);

  if (currentProject) {
    await setProjectNow(
      currentProject,
      setProjectState,
      resetUpdateProjectModal,
      clearUpdateErrors,
      setValueUpdate,
      setIsLoadingProjectResources
    );
    onOpenView();
  }
}