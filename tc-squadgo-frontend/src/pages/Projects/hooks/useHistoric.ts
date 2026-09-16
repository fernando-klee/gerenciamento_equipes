import { useState, useCallback } from "react";
import { v4 } from "uuid";
import { format, parseISO } from "date-fns";
import { api } from "../../../services/api";
import { HistoricProps } from "../Models";
import { useToast } from "@chakra-ui/react";

export function useHistoric() {
  const toast = useToast();
  const [historic, setHistoric] = useState<HistoricProps[]>([]);
  const [loadingHistoric, setLoadingHistoric] = useState(false);
  const [loadingMoreHistoric, setLoadingMoreHistoric] = useState(false);
  const [historicFilter, setHistoricFilter] = useState({
    current_page: 1,
    last_page: 1,
  });
  const [projectHistoricSelected, setProjectHistoricSelected] = useState({
    project_id: -1,
    name: "",
  });

  const loadHistoric = useCallback(async (project_id: number, name: string) => {
    setLoadingHistoric(true);
    try {
      const response = await api.get(
        `/projects/${project_id}/historic?currentPage=1`
      );
      const responseData = response.data;
      const { current_page, last_page } = responseData;
      setHistoricFilter({ current_page, last_page });
      
      const newHistorics = responseData.data.map((h: HistoricProps) => {
        const parsedDate = parseISO(h.created_at.toString());
        return {
          ...h,
          uuid: v4(),
          created_at: format(parsedDate, "dd/MM/yyyy HH:mm"),
        };
      });
      setHistoric(newHistorics);
      setProjectHistoricSelected({ project_id, name });
    } catch (error) {
      toast({
        title: "Erro ao carregar histórico",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoadingHistoric(false);
    }
  }, [toast]);

  const loadMoreHistoric = useCallback(async () => {
    if (projectHistoricSelected.project_id === -1) return;

    setLoadingMoreHistoric(true);
    try {
      const nextPage = historicFilter.current_page + 1;
      const response = await api.get(
        `/projects/${projectHistoricSelected.project_id}/historic?currentPage=${nextPage}`
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
      setHistoric((old) => [...old, ...newHistorics]);
      setHistoricFilter((old) => ({
        ...old,
        current_page: nextPage,
      }));
    } catch (error) {
      toast({
        title: "Erro ao carregar mais histórico",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoadingMoreHistoric(false);
    }
  }, [projectHistoricSelected.project_id, historicFilter.current_page, toast]);

  const resetHistoric = useCallback(() => {
    setHistoric([]);
    setProjectHistoricSelected({ project_id: -1, name: "" });
    setHistoricFilter({ current_page: 1, last_page: 1 });
  }, []);

  return {
    historic,
    loadingHistoric,
    loadingMoreHistoric,
    historicFilter,
    projectHistoricSelected,
    loadHistoric,
    loadMoreHistoric,
    resetHistoric,
  };
} 