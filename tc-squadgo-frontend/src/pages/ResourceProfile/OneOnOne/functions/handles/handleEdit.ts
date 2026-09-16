import { FieldValues, UseFormClearErrors, UseFormReset } from "react-hook-form"
import { api } from "../../../../../services/api"
import { OneOnOneProps } from "../../interfaces"
import { handleCloseEditModal } from "./handleCloseEditModal"

export async function handleEdit(
    data: any,
    selectedNote: OneOnOneProps | null,
    setLoadingEditing: React.Dispatch<React.SetStateAction<boolean>>,
    oneOnOnes: OneOnOneProps[],
    setOneOnOnes:  React.Dispatch<React.SetStateAction<OneOnOneProps[]>>, 
    setOneOnOnesFiltered:  React.Dispatch<React.SetStateAction<OneOnOneProps[]>>,
    resetEdit: UseFormReset<FieldValues>,
    clearErrorsEdit: UseFormClearErrors<FieldValues>,
    setSelectedNote: React.Dispatch<React.SetStateAction<OneOnOneProps | null>> ,
    onEditClose: () => void,
    toast: any

) {
        if (!selectedNote) return

         setLoadingEditing(true)
        try {
            await api.put(`/one-on-one/${selectedNote.id}`, {
                description: data.description
            })

            // Update the note in the state
            const updatedNotes =  oneOnOnes.map(note =>
                note.id ===  selectedNote?.id
                    ? { ...note, description: data.description }
                    : note
            )
            setOneOnOnes(updatedNotes)
            setOneOnOnesFiltered(updatedNotes)

            toast({
                title: 'Anotação atualizada com sucesso',
                status: 'success',
                duration: 4000,
                isClosable: true
            })

            handleCloseEditModal(
                resetEdit,
                clearErrorsEdit,
                setSelectedNote,
                onEditClose
            )
        } catch (error: any) {
            console.error('Error updating one-on-one:', error)
            toast({
                title: 'Erro ao atualizar anotação',
                description: error.response?.data?.message || 'Ocorreu um erro ao atualizar a anotação',
                status: 'error',
                duration: 4000,
                isClosable: true
            })
        } finally {
             setLoadingEditing(false)
        }
    }
