import { api } from "../../../services/api";
import { parseISO } from "date-fns";
import { CustomerProps } from "../interfaces"; 
import { FieldValues, UseFormReset } from "react-hook-form";
import { ToastProps } from "@chakra-ui/react";



export async function handleCreateNewCustomer(
    values: any,
    setIsLoadingCreating: React.Dispatch<React.SetStateAction<boolean>>,
    newCustomerImage: {
    file: File | null;
    tempImage: string;
    },
    customers: CustomerProps[],
    setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
    setCustomersFiltered: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
    resetNewCustomerModal: UseFormReset<FieldValues>,
    closeNewCustomerModal: () => void,
    toast: (props: ToastProps) => void
): Promise<void> {
        setIsLoadingCreating(true);

        const sanitizedValues = {
            name: values.name.trim(),
            hired_hours: values.hired_hours,
            status: values.status ? 'ATIVO' : 'INATIVO',
            resource_profile: values.resource_profile?.trim() || null,
            objective: values.objective?.trim() || null,
            start_contract_time: values.start_contract_time,
            end_contract_time: values.end_contract_time,
            responsible_name: values.responsible_name.trim(),
            responsible_email: values.responsible_email,
            responsible_phone: values.responsible_phone
        };

        const formData = new FormData();
        
        Object.entries(sanitizedValues).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
            formData.append(key, value.toString());
            }
        });

        if (newCustomerImage.file) {
            formData.append('image', newCustomerImage.file);
        }

        await api.post('/customers', formData, { headers: { 'content-type': 'multipart/form-data' } })
            .then(res => {
            const response = res.data;
            let start_contract_time = null;
            if (response.start_contract_time) start_contract_time = parseISO(response.start_contract_time + '');

            let end_contract_time = null;
            if (response.end_contract_time) end_contract_time = parseISO(response.end_contract_time + '');
            
            const newCustomer = { 
                ...response, 
                start_contract_time, 
                end_contract_time,
                resource_profile: response.resource_profile || null,
                objective: response.objective || null
            };

            const newCustomers = [...customers, newCustomer]
                .sort((a, b) => a.name.localeCompare(b.name));
            
            setCustomers(newCustomers);
            setCustomersFiltered(newCustomers);

            resetNewCustomerModal();

            toast({
                title: 'Cliente cadastrado!',
                status: 'success',
                duration: 4000,
                isClosable: true
            });

            closeNewCustomerModal();
            })
            .catch(err => {
            console.error('Erro ao cadastrar cliente:', err);
            
            let errorMessage = 'Ocorreu um erro ao tentar cadastrar um cliente, entre em contato com o suporte';
            
            if (err.response?.data?.message === "Cliente com este nome já existe") {
                errorMessage = err.response.data.message;
            }
            
            toast({
                title: errorMessage,
                status: 'error',
                duration: 4000,
                isClosable: true
            });
            });
        setIsLoadingCreating(false);
        }
