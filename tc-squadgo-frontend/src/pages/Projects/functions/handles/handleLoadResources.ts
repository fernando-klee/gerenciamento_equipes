import { api } from "../../../../services/api";
import { ResourceProps } from "../../interfaces";

export async function handleLoadResources(
    setResources: React.Dispatch<React.SetStateAction<ResourceProps[]>>,
    setIsLoadingResources: React.Dispatch<React.SetStateAction<boolean>>
) {
      const response = await api.get("/resources/actives");
      const currentResources = response.data.map((cr: ResourceProps) => {
        return { ...cr, value: cr.id, label: cr.name, project_hours: 0 };
      });
      setResources(currentResources);
      setIsLoadingResources(false);
    }