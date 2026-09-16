import { FieldValues, UseFormClearErrors, UseFormReset } from "react-hook-form";


export function handleCloseNewCustomerModal(
    setNewCustomerImage: React.Dispatch<React.SetStateAction<{
    file: File | null;
    tempImage: string;
}>>,
    clearErrors: UseFormClearErrors<FieldValues>,
    resetNewCustomerModal: UseFormReset<FieldValues>,
    onClose: () => void
) {
    setNewCustomerImage({ file: null, tempImage: '' })
    clearErrors()
    resetNewCustomerModal()
    onClose()
}