import { api } from "../../../services/api"
import { CustomerProjectsProps, CustomerProps } from "../interfaces"

export async function loadCurrentCustomerProjectsToShowAtStatus(
    currentSelectedCustomerProjects: CustomerProjectsProps | undefined,
    selectedCustomer: CustomerProps,
    currentSelectedCustomerStatus: boolean,
    setCurrentSelectedCustomerProjects: React.Dispatch<React.SetStateAction<CustomerProjectsProps | undefined>>,
) {
        if (currentSelectedCustomerProjects?.customer_id !== selectedCustomer.id && currentSelectedCustomerStatus) {
            setCurrentSelectedCustomerProjects((oldData: any) => {
                return { ...oldData, isLoading: true }
            })

            if (selectedCustomer) {
                const res = await api.get(`/customers/${selectedCustomer.id}/projects-in-progress`)
                setCurrentSelectedCustomerProjects({ projects: res.data, customer_id: selectedCustomer.id, isLoading: false })
            }
        }

    }