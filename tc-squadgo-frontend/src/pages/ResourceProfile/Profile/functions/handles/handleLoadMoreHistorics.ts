import { api } from "../../../../../services/api"
import { format, parseISO } from "date-fns"
import { ResourceHistoric, ResourceHistoricFilter } from "../../interfaces"

export async function handleloadMoreHistorics(
    resource_id: string,
    historicFilter: Omit<ResourceHistoricFilter, "data">,
    setResourceHistorics: React.Dispatch<React.SetStateAction<ResourceHistoric[]>>,
    setLoadingMoreHistoric: React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoadingHistoric: React.Dispatch<React.SetStateAction<boolean>>
) {
            const currentPage = `currentPage=${historicFilter.current_page}`

            const response = await api.get(`/resources/${Number(resource_id)}/historic?${currentPage}`)
            const resourceHistoricResponse = response.data

            const resourceHistoricData = resourceHistoricResponse.data

            const historicsFormatted = resourceHistoricData.map((f: ResourceHistoric) => {
                return { ...f, created_at: format(parseISO(f.created_at + ''), 'dd/MM/yyyy') }
            })

            setResourceHistorics((oldState: any) => {
                return [...oldState, ...historicsFormatted]
            })
            setLoadingMoreHistoric(false)
            setIsLoadingHistoric(false)
        }