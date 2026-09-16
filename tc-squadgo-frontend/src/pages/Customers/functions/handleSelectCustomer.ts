import { FieldValues, UseFormClearErrors, UseFormReset, UseFormSetValue } from "react-hook-form"
import { CustomerProps } from "../interfaces"; 

export function handleSelectCustomer(
    customer_id: number,
    resetUpdateCustomerModal: UseFormReset<FieldValues>,
    clearUpdateErrors: UseFormClearErrors<FieldValues>,
    customers: CustomerProps[],
    setSelectedCustomer: React.Dispatch<React.SetStateAction<CustomerProps>>,
    setValueUpdate: UseFormSetValue<FieldValues>,
    setCurrentSelectedCustomerStatus: React.Dispatch<React.SetStateAction<boolean>>,
    onOpenUpdate: () => void
) {
    try {
        console.log('handleSelectCustomer chamado para ID:', customer_id);
        console.log('Total de clientes:', customers.length);
        
        // Reset do formulário
        resetUpdateCustomerModal();
        clearUpdateErrors();

        // Encontrar o cliente
        const currentCustomer = customers.find(c => {
            console.log('Comparando:', c.id, 'com', customer_id, 'resultado:', c.id === customer_id);
            return c.id === customer_id;
        });
        
        console.log('Cliente encontrado:', currentCustomer);

        if (currentCustomer) {
            // Usar setTimeout para garantir que o formulário foi resetado primeiro
            setTimeout(() => {
                setSelectedCustomer(currentCustomer);
                
                // Preencher formulário com valores seguros (tratando null/undefined)
                const safeSetValue = (field: string, value: any) => {
                    setValueUpdate(field, value === null || value === undefined ? '' : value);
                };
                
                safeSetValue('name', currentCustomer.name);
                safeSetValue('hired_hours', currentCustomer.hired_hours);
                safeSetValue('resource_profile', currentCustomer.resource_profile);
                safeSetValue('objective', currentCustomer.objective);
                safeSetValue('responsible_name', currentCustomer.responsible_name);
                safeSetValue('responsible_email', currentCustomer.responsible_email);
                safeSetValue('responsible_phone', currentCustomer.responsible_phone);
                safeSetValue('start_contract_time', currentCustomer.start_contract_time);
                safeSetValue('end_contract_time', currentCustomer.end_contract_time);
                
                setCurrentSelectedCustomerStatus(currentCustomer.status === 'ATIVO');
                
                // Pequeno delay antes de abrir o modal
                setTimeout(() => {
                    onOpenUpdate();
                }, 50);
            }, 50);
        } else {
            onOpenUpdate();
        }
    } catch (error) {
        console.error('Erro em handleSelectCustomer:', error);
        onOpenUpdate(); // Abre o modal mesmo com erro
    }
}