import { api } from "../../../services/api";
import { parseISO } from "date-fns";
import { CustomerProjectsProps, CustomerProps } from "../interfaces"

import { FieldValues, UseFormClearErrors, UseFormReset } from "react-hook-form";
import { ToastProps } from "@chakra-ui/react";

export async function handleUpdateCustomer(
    values: any,
    setIsLoadingUpdating: React.Dispatch<React.SetStateAction<boolean>>,
    currentSelectedCustomerStatus: boolean,
    selectedCustomer: CustomerProps,
    customers: CustomerProps[],
    setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
    customersFiltered: CustomerProps[],
    setCustomersFiltered: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
    resetUpdateCustomerModal:  UseFormReset<FieldValues>,
    clearUpdateErrors: UseFormClearErrors<FieldValues>,
    setCurrentSelectedCustomerProjects:React.Dispatch<React.SetStateAction<CustomerProjectsProps | undefined>>,
    onCloseUpdate: () => void,
    toast: (props: ToastProps) => void
): Promise<void> {
    setIsLoadingUpdating(true);
    
    const sanitizedData = {
        name: values.name.trim(),
        hired_hours: values.hired_hours,
        status: currentSelectedCustomerStatus ? 'ATIVO' : 'INATIVO',
        resource_profile: values.resource_profile?.trim() || null,
        objective: values.objective?.trim() || null,
        start_contract_time: values.start_contract_time,
        end_contract_time: values.end_contract_time,
        responsible_name: values.responsible_name.trim(),
        responsible_email: values.responsible_email,
        responsible_phone: values.responsible_phone
    };

    const payload = Object.fromEntries(
        Object.entries(sanitizedData).filter(([_, value]) => value !== null)
    );

    await api.put(`/customers/${selectedCustomer.id}`, payload)
        .then(res => {
        const response = res.data;
        let start_contract_time = null;
        if (response.start_contract_time) {
            start_contract_time = parseISO(response.start_contract_time + '');
        }

        let end_contract_time = null;
        if (response.end_contract_time) {
            end_contract_time = parseISO(response.end_contract_time + '');
        }

        const customerUpdated = { 
            ...response, 
            start_contract_time, 
            end_contract_time,
            resource_profile: response.resource_profile || null,
            objective: response.objective || null,
            image_url: selectedCustomer.image_url 
        };

        
        const newCustomers = customers
            .filter(c => c.id !== selectedCustomer.id) 
            .concat(customerUpdated) 
            .sort((a, b) => a.name.localeCompare(b.name)); 
        
        setCustomers(newCustomers);

        const customerFilteredIndex = customersFiltered.findIndex(c => c.id === selectedCustomer.id);

        if (customerFilteredIndex !== -1) {
            const newCustomersFiltered = customersFiltered
                .filter(c => c.id !== selectedCustomer.id) 
                .concat(customerUpdated) 
                .sort((a, b) => a.name.localeCompare(b.name)); 
            
            setCustomersFiltered(newCustomersFiltered);
        }

        resetUpdateCustomerModal();
        clearUpdateErrors();

        setCurrentSelectedCustomerProjects(undefined);

        toast({
            title: `${values.name} atualizado!`,
            status: 'success',
            duration: 4000,
            isClosable: true
        });

        onCloseUpdate();
        })
        .catch(err => {
        toast({
            title: 'Ocorreu um erro ao atualizar o cliente',
            status: 'error',
            duration: 4000,
            isClosable: true
        });
        });
    setIsLoadingUpdating(false);
}