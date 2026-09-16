import { FieldValues, UseFormSetValue } from "react-hook-form"
import { OneOnOneProps } from "../../interfaces"

export function handleEditClick(
    note: OneOnOneProps,
    setSelectedNote: React.Dispatch<React.SetStateAction<OneOnOneProps | null>>,
    setValueEdit: UseFormSetValue<FieldValues>,
    onEditOpen: () => void
) {
        setSelectedNote(note)
        setValueEdit('description', note.description)
        onEditOpen()
    }