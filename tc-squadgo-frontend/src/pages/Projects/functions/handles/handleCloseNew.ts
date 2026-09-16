import { ProjectProps } from "../../interfaces";

export function handleCloseNewModal(
  setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
  resetNewProjectModal: () => void,
  clearNewErrors: () => void,
  setNewProjectResources: (resources: any[]) => void,
  onCloseNew: () => void
) {
  setProjectState(undefined);
  resetNewProjectModal();
  clearNewErrors();
  setNewProjectResources([]);
  onCloseNew();
}