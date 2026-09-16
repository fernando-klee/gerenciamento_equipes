import { SetStateFunction } from "../Models"
import { CustomerProps, FilterProps } from "../interfaces"
import { api } from "../../../services/api"
import { parseISO } from "date-fns"




export async function handleLoadCustomers(
    filters: FilterProps,
    setCustomers: SetStateFunction<CustomerProps[]>,
    setCustomersFiltered: SetStateFunction<CustomerProps[]>,
    setLoadingCustomers: SetStateFunction<boolean>
) {
            const response = await api.get(`/customers?name=${filters.name}&status=&qtdPerPage=${filters.qtdPerPage}&currentPage=${filters.currentPage}`)

            const customersData = response.data.data.map((cd: CustomerProps) => {
                let start_contract_time = null
                if (cd.start_contract_time) start_contract_time = parseISO(cd.start_contract_time + '')

                let end_contract_time = null
                if (cd.end_contract_time) end_contract_time = parseISO(cd.end_contract_time + '')
                return { ...cd, start_contract_time, end_contract_time }
            })
            setCustomers(customersData)
            setCustomersFiltered(customersData)

            setLoadingCustomers(false)
        }