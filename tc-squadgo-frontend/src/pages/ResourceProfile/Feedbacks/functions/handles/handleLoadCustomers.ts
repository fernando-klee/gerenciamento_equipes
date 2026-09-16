import { api } from "../../../../../services/api"
import { CustomerProps } from "../../interfaces"

export async function handleloadCustomers(
    setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
    setIsLoadingCustomers: React.Dispatch<React.SetStateAction<boolean>>
) {
        const response = await api.get(`/customers?qtdPerPage=500&currentPage=1`)
        setCustomers(response.data.data)
        setIsLoadingCustomers(false)
}