export function handleOnCloseProjectHistoricModal(
    setProjectHistoricSelected: React.Dispatch<React.SetStateAction<{
    project_id: number;
    name: string;
  }>>,
    setHistoric: React.Dispatch<React.SetStateAction<any[]>>,
    onCloseHistoric: () => void) {
    setProjectHistoricSelected({ project_id: -1, name: "" });
    setHistoric([]);
    onCloseHistoric();
  }