import { api } from "../../../../services/api";
import { ResourceProps } from "../../interfaces";

export async function handleLoadResponsibles(
    setResponsibles: React.Dispatch<React.SetStateAction<ResourceProps[]>>,
    setIsLoadingResponsibles: React.Dispatch<React.SetStateAction<boolean>>
) {
      const response = await api.get("/resources/responsibles");
      const currentResponsibles = response.data
        .filter((cr: ResourceProps) => cr.status !== "INATIVO")
        .map((cr: ResourceProps) => {
          return {
            ...cr,
            value: cr.id,
            label: cr.name,
            project_hours: 0,
            departure_forecast: cr.departure_forecast,
          };
        });
      setResponsibles(currentResponsibles);
      setIsLoadingResponsibles(false);
    }
