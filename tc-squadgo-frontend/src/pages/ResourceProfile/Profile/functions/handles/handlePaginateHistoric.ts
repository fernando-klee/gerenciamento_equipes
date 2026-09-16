import { ResourceHistoricFilter } from "../../interfaces"

export async function handlePaginateHistoric(
    historicFilter: Omit<ResourceHistoricFilter, "data">,
    setHistoricFilter: React.Dispatch<React.SetStateAction<Omit<ResourceHistoricFilter, "data">>> ,
    setLoadingMoreHistoric: React.Dispatch<React.SetStateAction<boolean>>
) {
        const { current_page, last_page } = historicFilter
        if (current_page < last_page) {
            setLoadingMoreHistoric(true)
            setHistoricFilter(oldState => {
                return { ...oldState, current_page: current_page + 1 }
            })
        }
    }