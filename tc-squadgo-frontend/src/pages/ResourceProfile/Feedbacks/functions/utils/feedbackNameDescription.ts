import { FeedbackProps } from "../../interfaces"

 export function feedbackNameDescription(feedback: FeedbackProps): string | null {
        if (feedback.type === 'CUSTOMER' && feedback.customer) return feedback.customer.name
        else if (feedback.type === 'PROJECT' && feedback.project) return feedback.project.name
        else return null
    }