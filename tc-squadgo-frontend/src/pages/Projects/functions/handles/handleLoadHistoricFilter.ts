import { api } from "../../../../services/api";

export async function handleLoadHistoricFilter(
  projectHistoricSelected: { project_id: number; name: string },
  setHistoricFilter: React.Dispatch<React.SetStateAction<{
    current_page: number;
    last_page: number;
  }>>
) {
  if (projectHistoricSelected.project_id !== -1) {
    const response = await api.get(
      `/projects/${projectHistoricSelected.project_id}/historic?currentPage=1`
    );
    const responseData = response.data;
    const { current_page, last_page } = responseData;
    setHistoricFilter({ current_page, last_page });
  }
}