import { FieldValues, UseFormClearErrors, UseFormReset } from "react-hook-form"
import { OneOnOneProps } from "../../interfaces"

  export function handleCloseEditModal(
    resetEdit: UseFormReset<FieldValues>,
    clearErrorsEdit: UseFormClearErrors<FieldValues>,
    setSelectedNote: React.Dispatch<React.SetStateAction<OneOnOneProps | null>>,
    onEditClose: () => void
  ) {
        resetEdit()
        clearErrorsEdit()
        setSelectedNote(null)
        onEditClose()
    }