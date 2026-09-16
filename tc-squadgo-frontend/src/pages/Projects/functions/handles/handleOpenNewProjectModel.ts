import { ProjectProps, ResourceProps } from "../../interfaces";

export function handleOpenNewProjectModal(
  handleCloseNewModal: (
    setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
    resetNewProjectModal: () => void,
    clearNewErrors: () => void,
    setNewProjectResources: React.Dispatch<React.SetStateAction<ResourceProps[]>>,
    onCloseNew: () => void
  ) => void,
  setProjectState: React.Dispatch<React.SetStateAction<ProjectProps | undefined>>,
  resetNewProjectModal: () => void,
  clearNewErrors: () => void,
  setNewProjectResources: React.Dispatch<React.SetStateAction<ResourceProps[]>>,
  onCloseNew: () => void,
  onOpenNew: () => void
) {
  handleCloseNewModal(
    setProjectState,
    resetNewProjectModal,
    clearNewErrors,
    setNewProjectResources,
    onCloseNew
  );
  onOpenNew();
}