import { format, parseISO } from "date-fns"
import { api } from "../../../../../services/api"
import { FeedbackProps } from "../../interfaces"
import { handleCloseNewModal } from "./handleCloseModal"
import { FieldValues, UseFormClearErrors, UseFormReset } from "react-hook-form"

export async function handleCreate(
    data: any,
    resource_id: string,
    user: { id: number },
    setLoadingCreating: React.Dispatch<React.SetStateAction<boolean>>,
    setFeedbacksFiltered: React.Dispatch<React.SetStateAction<FeedbackProps[]>>,
    feedbacks:  FeedbackProps[],
    reset: UseFormReset<FieldValues>,
    clearErrors: UseFormClearErrors<FieldValues>,
    onClose: () => void
) {
        setLoadingCreating(true)
        const response = await api.post('/feedbacks', {
            ...data,
            resource_id: resource_id,
            reporter_id: user.id
        })

        const feedbackCreated = response.data as FeedbackProps
        const feedbackCreatedFormatted: any = { ...feedbackCreated, created_at: format(parseISO(feedbackCreated.created_at + ''), 'dd/MM/yyyy') }
        const oldFeedbacks = [...feedbacks, feedbackCreatedFormatted]

        setFeedbacksFiltered(oldFeedbacks)

        handleCloseNewModal(reset, clearErrors, onClose)

        setLoadingCreating(false)
    }