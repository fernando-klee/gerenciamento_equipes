export const handleOpenModalDelete = (
  resource_id: number,
  setIdUserToDelete: React.Dispatch<React.SetStateAction<number | null>>, 
  onOpenDelete: () => void
) => {
  setIdUserToDelete(resource_id);
  onOpenDelete();
};