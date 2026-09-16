import { CustomerProps } from "../interfaces" 

export function filterCustomersByName(
    name: string,
    customers: CustomerProps[],
    setCustomersFiltered: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
) {
        if (name !== '' || !name.match(/\s\s+/g)) {
            setTimeout(() => {
                let newCustomersFiltered = customers.filter((r: CustomerProps) => r.name.toLocaleLowerCase().includes(name.toLowerCase()))
                setCustomersFiltered(newCustomersFiltered)
            }, 1000)
        } else {
            setCustomersFiltered(customers)
        }
    }