import { format, parseISO } from "date-fns";
import { api } from "../../../../services/api";
import { v4 } from "uuid";
import { HistoricProps } from "../../interfaces";

export async function handleLoadHistoric(
  projectHistoricSelected: { project_id: number; name: string },
  historicFilter: { current_page: number; last_page: number },
  setHistoric: React.Dispatch<React.SetStateAction<HistoricProps[]>>,
  setLoadingHistoric: React.Dispatch<React.SetStateAction<boolean>>,
  setLoadingMoreHistoric: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const response = await api.get(
      `/projects/${projectHistoricSelected.project_id}/historic?currentPage=${historicFilter.current_page}`
    );
    
    const responseData = response.data;
    const newHistorics = responseData.data.map((h: HistoricProps) => {
      const parsedDate = parseISO(h.created_at.toString());
      return {
        ...h,
        uuid: v4(),
        created_at: format(parsedDate, "dd/MM/yyyy HH:mm"),
      };
    });
    
    setHistoric((oldData) => [...oldData, ...newHistorics]);
  } catch (error) {
    console.error("Error loading historic:", error);
  } finally {
    setLoadingHistoric(false);
    setLoadingMoreHistoric(false);
  }
}