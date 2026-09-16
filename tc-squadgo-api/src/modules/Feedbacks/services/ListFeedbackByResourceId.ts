import { inject, injectable } from 'tsyringe'
import Feedback from '../infra/typeorm/entities/Feedback'
import IFeedbacksRepository from '../repositories/IFeedbacksRepository'

interface IRequest {
	resource_id: number
	type: 'PROJECT' | 'CUSTOMER' | 'PERSONAL'
}

@injectable()
export default class ListFeedbackByResourceId {
	constructor(
		@inject('FeedbacksRepository')
		private feedbacksRepository: IFeedbacksRepository
	) { }

	async execute(data: IRequest): Promise<Feedback[]> {
		const { resource_id, type } = data
		const feedbacks = await this.feedbacksRepository.filter(resource_id, type)

		return feedbacks
	}
}
