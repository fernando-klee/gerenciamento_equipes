import { FeedbackProps } from "../../interfaces"

export function handleFilterFeedback(
    text: string,
    feedbacks: FeedbackProps[],
    setFeedbacksFiltered: React.Dispatch<React.SetStateAction<FeedbackProps[]>>
) {
        text = text.toLowerCase()
        if (text !== '' || !text.match(/\s\s+/g)) {
            setTimeout(() => {
                let feedbacksFiltered = feedbacks.filter((f: FeedbackProps) => {
                    const byReporter = f.reporter?.name.toLowerCase().includes(text)
                    const byFeedback = f.description.toLowerCase().includes(text)
                    const byProject = f.project?.name.toLowerCase().includes(text)
                    const byCustomer = f.customer?.name.toLowerCase().includes(text)
                    const byResource = f.resource.name.toLowerCase().includes(text)
                    return byReporter || byFeedback || byProject || byCustomer || byResource
                })
                setFeedbacksFiltered(feedbacksFiltered)
            }, 1000)
        } else {
            setFeedbacksFiltered(feedbacks)
        }
    }