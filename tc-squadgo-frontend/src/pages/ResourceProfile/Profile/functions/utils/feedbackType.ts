import { FeedbackProps } from "../../interfaces"

export function feedbackType (feedback: FeedbackProps): string {
        if (feedback.type === 'CUSTOMER' && feedback.customer) return feedback.customer.name
        else if (feedback.type === 'PROJECT' && feedback.project) return feedback.project.name
        else if (feedback.type === 'RESOURCE') return 'Colaborador'
        else return 'Pessoal'
    }