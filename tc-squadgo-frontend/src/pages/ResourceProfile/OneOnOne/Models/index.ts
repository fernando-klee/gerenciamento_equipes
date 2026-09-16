import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../../../../context/AuthContext"
import { loadOneOnOnes } from "../functions/services/loadOneOnOnes"
import { OneOnOneParams, OneOnOneProps } from "../interfaces"
import { useDisclosure, useToast } from "@chakra-ui/react"
import { FieldValues, UseFormClearErrors, UseFormReset, UseFormSetValue } from "react-hook-form"
import { handleCloseNewModal } from "../functions/handles/handleCloseNewModal"
import { handleCloseEditModal } from "../functions/handles/handleCloseEditModal"
import { handleEditClick } from "../functions/handles/handleEditClick"
import { handleCreate } from "../functions/handles/handleCreate"
import { handleEdit } from "../functions/handles/handleEdit"
import { handleDelete } from "../functions/handles/handleDelete"
import { handleFilterOneOnOne } from "../functions/handles/handleFilterOneOnOne"
import { oneOnOneTypeDescription } from "../functions/utils/oneOnOneTypeDescription"


export const useOneOnOne = () => {
    const { user } = useAuth()
    const { resource_id } = useParams<OneOnOneParams>()
    const [loading, setLoading] = useState(true)
    const [loadingCreating, setLoadingCreating] = useState(false)
    const [loadingEditing, setLoadingEditing] = useState(false)
    const [loadingDeleting, setLoadingDeleting] = useState(false)
    const [oneOnOnes, setOneOnOnes] = useState<OneOnOneProps[]>([])
    const [oneOnOnesFiltered, setOneOnOnesFiltered] = useState<OneOnOneProps[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const [selectedNote, setSelectedNote] = useState<OneOnOneProps | null>(null)
    const [selectedType, setSelectedType] = useState<'LEADER' | 'RESOURCE'>('LEADER')
    const toast = useToast()


    useEffect(() => {
        loadOneOnOnes(
            resource_id,
            setOneOnOnes,
            setOneOnOnesFiltered,
            setLoading)
    }, [resource_id, toast])

    const services = {
        loadOneOnOnes: (
            resource_id: string,
            setOneOnOnes: React.Dispatch<React.SetStateAction<OneOnOneProps[]>>,
            setOneOnOnesFiltered: React.Dispatch<React.SetStateAction<OneOnOneProps[]>>,
            setLoading: React.Dispatch<React.SetStateAction<boolean>>
        ) => loadOneOnOnes(
            resource_id,
            setOneOnOnes,
            setOneOnOnesFiltered,
            setLoading
        )
    }

    const handles = {
        handleCloseNewModal:(
            resetCreate: UseFormReset<FieldValues>,
            clearErrorsCreate: UseFormClearErrors<FieldValues>,
            onClose: () => void
        ) => handleCloseNewModal(
            resetCreate,
            clearErrorsCreate,
            onClose
        ),

        handleCloseEditModal:(
            resetEdit: UseFormReset<FieldValues>,
            clearErrorsEdit: UseFormClearErrors<FieldValues>,
            setSelectedNote: React.Dispatch<React.SetStateAction<OneOnOneProps | null>>,
            onEditClose: () => void
        ) => handleCloseEditModal(
            resetEdit,
            clearErrorsEdit,
            setSelectedNote,
            onEditClose
        ),

        handleEditClick:(
            note: OneOnOneProps,
            setSelectedNote: React.Dispatch<React.SetStateAction<OneOnOneProps | null>>,
            setValueEdit: UseFormSetValue<FieldValues>,
            onEditOpen: () => void
        ) => handleEditClick(
            note, 
            setSelectedNote,
            setValueEdit, 
            onEditOpen
        ),

        handleCreate:(
            data: any,
            setLoadingCreating: React.Dispatch<React.SetStateAction<boolean>>,
            user: any,
            resource_id: string,
            oneOnOnes: OneOnOneProps[],
            setOneOnOnesFiltered: React.Dispatch<React.SetStateAction<OneOnOneProps[]>>,
            setOneOnOnes: React.Dispatch<React.SetStateAction<OneOnOneProps[]>>,
            resetCreate: UseFormReset<FieldValues>,
            clearErrorsCreate: UseFormClearErrors<FieldValues>,
            onClose: () => void,
            toast: any
        ) => handleCreate(
            data, 
            setLoadingCreating, 
            user, 
            resource_id, 
            oneOnOnes, 
            setOneOnOnesFiltered, 
            setOneOnOnes, 
            resetCreate, 
            clearErrorsCreate, 
            onClose, 
            toast
        ),

        handleEdit:(
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
        ) => handleEdit(
            data, 
            selectedNote, 
            setLoadingEditing,
            oneOnOnes, 
            setOneOnOnes, 
            setOneOnOnesFiltered,
            resetEdit, 
            clearErrorsEdit, 
            setSelectedNote, 
            onEditClose, 
            toast
        ),

        handleDelete:(
            id: number,
            setLoadingDeleting: React.Dispatch<React.SetStateAction<boolean>>,
            setOneOnOnesFiltered: React.Dispatch<React.SetStateAction<OneOnOneProps[]>>,
            setOneOnOnes: React.Dispatch<React.SetStateAction<OneOnOneProps[]>>,
            toast: any
        ) => handleDelete(
            id, 
            setLoadingDeleting,
            setOneOnOnesFiltered,
            setOneOnOnes, 
            toast
        ),

        handleFilterOneOnOne:(
            text: string,
            oneOnOnes: OneOnOneProps[],
            setOneOnOnesFiltered: React.Dispatch<React.SetStateAction<OneOnOneProps[]>>
        ) => handleFilterOneOnOne(
            text,
            oneOnOnes, 
            setOneOnOnesFiltered
        )
    }

    const utils = {
        oneOnOneTypeDescription:(
            oneOnOne: OneOnOneProps
        ) => oneOnOneTypeDescription(
            oneOnOne
        )
    }

    return {
        modals: {
            isOpen, onOpen, onClose,
            isEditOpen, onEditOpen, onEditClose
        },
        states: {
        loading, 
        setLoading,
        loadingCreating, 
        setLoadingCreating,
        loadingEditing, 
        setLoadingEditing,
        loadingDeleting, 
        setLoadingDeleting,
        oneOnOnes, 
        setOneOnOnes,
        oneOnOnesFiltered, 
        setOneOnOnesFiltered,
        selectedNote, 
        setSelectedNote,
        selectedType, 
        setSelectedType
        },
        
        toast,
        resource_id, 
        user,
        services, 
        handles,
        utils
    }
} 