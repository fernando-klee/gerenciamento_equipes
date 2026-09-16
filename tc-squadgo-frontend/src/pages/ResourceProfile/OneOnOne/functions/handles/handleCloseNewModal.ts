import { FieldValues, UseFormClearErrors, UseFormReset } from "react-hook-form"

   export function handleCloseNewModal(
    resetCreate: UseFormReset<FieldValues>,
    clearErrorsCreate: UseFormClearErrors<FieldValues>,
    onClose: () => void
   ) {
        resetCreate()
        clearErrorsCreate()
        onClose()
    }