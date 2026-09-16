import { format, parseISO } from "date-fns"
import { api } from "../../../../../services/api"
import { FeedbackProps } from "../../interfaces"

export async function handleLoadFeedbacks(
    resource_id: string,
    setFeedbacks: React.Dispatch<React.SetStateAction<FeedbackProps[]>>,
    setFeedbacksFiltered: React.Dispatch<React.SetStateAction<FeedbackProps[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
            const response = await api.get(`/feedbacks?resource_id=${Number(resource_id)}`)
            const feedbacksFormatted = response.data.map((f: FeedbackProps) => {
                return { ...f, created_at: format(parseISO(f.created_at + ''), 'dd/MM/yyyy') }
            })
            setFeedbacks(feedbacksFormatted)
            setFeedbacksFiltered(feedbacksFormatted)
            setLoading(false)
        }