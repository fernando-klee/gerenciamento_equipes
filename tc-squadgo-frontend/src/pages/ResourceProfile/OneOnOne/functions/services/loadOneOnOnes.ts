import { format, parseISO } from "date-fns"
import { api } from "../../../../../services/api"
import { OneOnOneProps } from "../../interfaces"

export async function loadOneOnOnes(
    resource_id: string,
    setOneOnOnes: React.Dispatch<React.SetStateAction<OneOnOneProps[]>>,
    setOneOnOnesFiltered: React.Dispatch<React.SetStateAction<OneOnOneProps[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
            try {
                // Get one-on-ones for the specific resource being viewed
                const response = await api.get(`/one-on-one`, {
                    params: {
                        resourceId: Number(resource_id)
                    }
                })

                const oneOnOnesFormatted = response.data.map((o: OneOnOneProps) => ({
                    ...o,
                    createdAt: format(parseISO(o.createdAt), 'dd/MM/yyyy')
                }))

                setOneOnOnes(oneOnOnesFormatted)
                setOneOnOnesFiltered(oneOnOnesFormatted)
            } catch (error: any) {
                console.error('Error loading one-on-ones:', error)
                // // Only show error toast for actual errors, not for empty results
                // if (error.response?.status !== 404) {
                //     toast({
                //         title: 'Erro ao carregar one-on-ones',
                //         description: error.response?.data?.message || 'Ocorreu um erro ao carregar as anotações',
                //         status: 'error',
                //         duration: 4000,
                //         isClosable: true
                //     })
                // }
            } finally {
                setLoading(false)
            }
        }