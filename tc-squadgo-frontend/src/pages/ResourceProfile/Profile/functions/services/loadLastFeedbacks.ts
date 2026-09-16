import { format, parseISO } from "date-fns"
import { api } from "../../../../../services/api"
import { FeedbackProps } from "../../interfaces"

export async function loadLastFeedbacks(
    resource_id: string,
    setFeedbacks: React.Dispatch<React.SetStateAction<FeedbackProps[]>>,
    setLoadingFeedbacks: React.Dispatch<React.SetStateAction<boolean>>
)   {
        const response = await api.get(`/feedbacks?resource_id=${Number(resource_id)}`)
        const feedbacksReturned: FeedbackProps[] = response.data
        const feedbacksFormatted = feedbacksReturned.map((f: FeedbackProps) => {
            return { ...f, created_at: format(parseISO(f.created_at + ''), 'dd/MM/yyyy') }
        })
        setFeedbacks(feedbacksFormatted)
        setLoadingFeedbacks(false)
    }