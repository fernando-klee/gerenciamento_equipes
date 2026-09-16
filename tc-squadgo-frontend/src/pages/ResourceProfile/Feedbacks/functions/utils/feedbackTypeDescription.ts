import { FeedbackProps } from "../../interfaces"

 export function feedbackTypeDescription(feedback: FeedbackProps): string {
        if (feedback.type === 'CUSTOMER' && feedback.customer) return 'Clientes'
        else if (feedback.type === 'PROJECT' && feedback.project) return 'Projeto'
        else if (feedback.type === 'RESOURCE') return 'Colaborador'
        else return 'Pessoal'
    }