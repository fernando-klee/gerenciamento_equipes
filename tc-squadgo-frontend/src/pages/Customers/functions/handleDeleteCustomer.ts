import { ToastProps } from "@chakra-ui/react"
import { api } from "../../../services/api"
import { CustomerProps } from "../interfaces" 

export async function handleDeleteCustomer(
    customer_id: number,
    setIsLoadingDelete: React.Dispatch<React.SetStateAction<boolean>>,
    customers: CustomerProps[],
    setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
    customersFiltered: CustomerProps[],
    setCustomersFiltered: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
    toast: (props: ToastProps) => void
) {
        setIsLoadingDelete(true)

        try {
            await api.delete(`/customers/${customer_id}`)

            const newCustomers = customers.filter(c => c.id !== customer_id)
            setCustomers(newCustomers)

            const newCustomersFiltered = customersFiltered.filter(c => c.id !== customer_id)
            setCustomersFiltered(newCustomersFiltered)
            
            toast({
                title: 'Cliente deletado!',
                status: 'success',
                duration: 4000,
                isClosable: true
            })

        } catch (err: any) {
            toast({
                title: 'Ocorreu um erro',
                status: 'error',
                duration: 4000,
                isClosable: true
            })
        }

        setIsLoadingDelete(false)
    }