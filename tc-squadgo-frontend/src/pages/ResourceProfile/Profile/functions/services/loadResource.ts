import { format } from "date-fns"
import { api } from "../../../../../services/api"
import { ResourceProps } from "../../interfaces"

export async function loadResource(
    resource_id: string,
    setResource: React.Dispatch<React.SetStateAction<ResourceProps | undefined>>,
    setLoadingResource: React.Dispatch<React.SetStateAction<boolean>>,
    toast: any
) {
            try {
                const response = await api.get(`/resources/${resource_id}`)
                let { admission_date, vacation_date, backFromVacation } = response.data

                if (admission_date) admission_date = format(new Date(admission_date), 'dd/MM/yyyy')
                if (vacation_date) vacation_date = format(new Date(vacation_date), 'dd/MM/yyyy')
                if (backFromVacation) backFromVacation = format(new Date(backFromVacation), 'dd/MM/yyyy')

                const resource = { ...response.data, admission_date, vacation_date, backFromVacation }

                setResource(resource)
            } catch (err) {
                toast({
                    title: 'Erro ao carregar dados do recurso222',
                    status: 'error',
                    duration: 4000,
                    isClosable: true
                })
            }
            setLoadingResource(false)
        }