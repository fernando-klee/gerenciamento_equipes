import { FieldValues, UseFormClearErrors, UseFormReset } from "react-hook-form"

  export function handleCloseNewModal(
    reset: UseFormReset<FieldValues>,
    clearErrors: UseFormClearErrors<FieldValues>,
    onClose: () => void
  ) {
        reset()
        clearErrors()
        onClose()
    }