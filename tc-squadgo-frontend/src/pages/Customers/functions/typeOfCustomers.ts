import { CustomerProps } from "../interfaces"  

export function typeOfCustomers(
    customerStatus: string,
    customersFiltered:  CustomerProps[]
): CustomerProps[] {
        const customersOfStatus = customersFiltered.filter(c => c.status === customerStatus)

        return customersOfStatus
    }