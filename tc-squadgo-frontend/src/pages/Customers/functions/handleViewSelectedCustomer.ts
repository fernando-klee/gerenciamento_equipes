import { CustomerProps } from "../interfaces"  


export function handleViewSelectedCustomer(
    customer_id: number,
    customers: CustomerProps[],
    setSelectedCustomer: React.Dispatch<React.SetStateAction<CustomerProps>>,
    setCurrentSelectedCustomerStatus: React.Dispatch<React.SetStateAction<boolean>>,
    onOpenView: () => void 
) {
        const currentCustomer = customers.find(c => c.id === customer_id)
        if (currentCustomer) {
            setSelectedCustomer(currentCustomer)
            setCurrentSelectedCustomerStatus(currentCustomer.status === 'ATIVO' ? true : false)
        }
        onOpenView()
    }