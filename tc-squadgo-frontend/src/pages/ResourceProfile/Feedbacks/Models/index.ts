import { useParams } from "react-router-dom"
import { useAuth } from "../../../../context/AuthContext"
import { CustomerProps, FeedbackProps, FeedbacksParams, ProjectProps } from "../interfaces"
import { useEffect, useState } from "react"
import { useDisclosure } from "@chakra-ui/react"
import { handleLoadFeedbacks } from "../functions/handles/handleLoadFeedbacks"
import { handleloadCustomers } from "../functions/handles/handleLoadCustomers"
import { handleLoadProjects } from "../functions/handles/handleLoadProjects"
import { handleChangeFeedbackType } from "../functions/handles/handleChangeFeedbackType"
import { handleCloseNewModal } from "../functions/handles/handleCloseModal"
import { FieldValues, UseFormClearErrors, UseFormReset } from "react-hook-form"
import { handleCreate } from "../functions/handles/handleCreate"
import { feedbackTypeDescription } from "../functions/utils/feedbackTypeDescription"
import { feedbackNameDescription } from "../functions/utils/feedbackNameDescription"
import { handleFilterFeedback } from "../functions/handles/handleFilterFeedback"


export const useFeedbacks = () => {
    const { user } = useAuth()
    const { resource_id } = useParams<FeedbacksParams>()
    const [loading, setLoading] = useState(true)
    const [loadingCreating, setLoadingCreating] = useState(false)
    const [feedbacks, setFeedbacks] = useState<FeedbackProps[]>([])
    const [feedbacksFiltered, setFeedbacksFiltered] = useState<FeedbackProps[]>([])
    const [typeSelected, setTypeSelected] = useState(undefined)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isLoadingCustomers, setIsLoadingCustomers] = useState(true)
    const [customers, setCustomers] = useState<CustomerProps[]>([])

    const [isLoadingProjects, setIsLoadingProjects] = useState(true)
    const [projects, setProjects] = useState<ProjectProps[]>([])

    const [selectedProjectId, setSelectedProjectId] = useState(0);

    useEffect(() => {
        handleLoadFeedbacks(
            resource_id,
            setFeedbacks,
            setFeedbacksFiltered,
            setLoading)
        handleloadCustomers(
            setCustomers, 
            setIsLoadingCustomers
        )
        handleLoadProjects(
            setProjects,
            setIsLoadingProjects
        )
    }, [resource_id])

    const handles = {
        handleLoadFeedbacks:(
            resource_id: string,
            setFeedbacks: React.Dispatch<React.SetStateAction<FeedbackProps[]>>,
            setFeedbacksFiltered: React.Dispatch<React.SetStateAction<FeedbackProps[]>>,
            setLoading: React.Dispatch<React.SetStateAction<boolean>>
        ) => handleLoadFeedbacks(
            resource_id,
            setFeedbacks,
            setFeedbacksFiltered,
            setLoading
        ),

        handleloadCustomers:(
            setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>,
            setIsLoadingCustomers: React.Dispatch<React.SetStateAction<boolean>>
        ) => handleloadCustomers(
            setCustomers, 
            setIsLoadingCustomers
        ),

        handleLoadProjects:(
            setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>,
            setIsLoadingProjects: React.Dispatch<React.SetStateAction<boolean>>
        ) => handleLoadProjects(
            setProjects,
            setIsLoadingProjects
        ),

        handleChangeFeedbackType:(
            type: any,
            setTypeSelected: React.Dispatch<React.SetStateAction<undefined>>
        ) => handleChangeFeedbackType(
            type,
            setTypeSelected
        ),

        handleCloseNewModal:(
            reset: UseFormReset<FieldValues>,
            clearErrors: UseFormClearErrors<FieldValues>,
            onClose: () => void
        ) => handleCloseNewModal(
            reset,
            clearErrors,
            onClose
        ), 

        handleCreate:(
            data: any,
            resource_id: string,
            user: { id: number },
            setLoadingCreating: React.Dispatch<React.SetStateAction<boolean>>,
            setFeedbacksFiltered: React.Dispatch<React.SetStateAction<FeedbackProps[]>>,
            feedbacks:  FeedbackProps[],
            reset: UseFormReset<FieldValues>,
            clearErrors: UseFormClearErrors<FieldValues>,
            onClose: () => void
        ) => handleCreate(
            data, 
            resource_id, 
            user,
            setLoadingCreating, 
            setFeedbacksFiltered, 
            feedbacks, 
            reset, 
            clearErrors, 
            onClose 
        ),

        handleFilterFeedback: (
            text: string,
            feedbacks: FeedbackProps[],
            setFeedbacksFiltered: React.Dispatch<React.SetStateAction<FeedbackProps[]>>
        ) => handleFilterFeedback(
            text,
            feedbacks,
            setFeedbacksFiltered
        )
    }

    const utils = {
        feedbackTypeDescription: (
            feedback: FeedbackProps
        ) => feedbackTypeDescription(
            feedback
        ),

        feedbackNameDescription: (
            feedback: FeedbackProps
        ) => feedbackNameDescription(
            feedback
        )
    }

    return {
        states : {
            loading,
            setLoading,
            loadingCreating, 
            setLoadingCreating,
            feedbacks,
            setFeedbacks,
            feedbacksFiltered, 
            setFeedbacksFiltered,
            typeSelected, 
            setTypeSelected,
            isLoadingCustomers, 
            setIsLoadingCustomers,
            customers, 
            setCustomers,
            isLoadingProjects, 
            setIsLoadingProjects,
            projects, 
            setProjects,
            selectedProjectId, 
            setSelectedProjectId
        }, 

        modals : { isOpen, onOpen, onClose },

        user, 
        resource_id,
        handles,
        utils
    }
}


