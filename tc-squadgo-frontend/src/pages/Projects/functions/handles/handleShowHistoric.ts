export async function handleShowHistoric(
    id: number,
    name: string,
    setLoadingHistoric: React.Dispatch<React.SetStateAction<boolean>>,
    setProjectHistoricSelected: React.Dispatch<React.SetStateAction<{
    project_id: number;
    name: string;
  }>>,
    onOpenHistoric: () => void
) {
    setLoadingHistoric(true);
    setProjectHistoricSelected({ project_id: id, name });
    onOpenHistoric();
  }