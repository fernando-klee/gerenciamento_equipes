import { api } from "../../../../../services/api"
import { ResourceHistoricFilter } from "../../interfaces"

export async function handleLoadLastsHistorics(
    resource_id: string, 
    setHistoricFilter: React.Dispatch<React.SetStateAction<Omit<ResourceHistoricFilter, "data">>>,
    setIsLoadingHistoric: React.Dispatch<React.SetStateAction<boolean>>
) {
            const response = await api.get(`/resources/${Number(resource_id)}/historic`)
            const resourceHistoricResponse = response.data

            const resourceHistoricFilter: Omit<ResourceHistoricFilter, 'data'> = resourceHistoricResponse

            setHistoricFilter(resourceHistoricFilter)
            setIsLoadingHistoric(false)
    }