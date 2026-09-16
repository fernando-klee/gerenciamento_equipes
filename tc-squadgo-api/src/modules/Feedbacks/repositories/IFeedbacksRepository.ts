import ICreateFeedback from '../dtos/ICreateFeedback'
import Feedback from '../infra/typeorm/entities/Feedback'

export default interface IFeedbacksRepository {
	create(data: ICreateFeedback): Promise<Feedback>
	filter(resource_id: number, type: string): Promise<Feedback[]>
	findById(feedback_id: number): Promise<Feedback | null>
}
