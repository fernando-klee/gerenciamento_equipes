import { Repository } from 'typeorm'
import ICreateFeedback from '../../../dtos/ICreateFeedback'
import IFeedbacksRepository from '../../../repositories/IFeedbacksRepository'
import Feedback from '../entities/Feedback'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'
export default class FeedbacksRepository implements IFeedbacksRepository {
	private ormRepository: Repository<Feedback>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(Feedback)
	}

	async findById(feedback_id: number): Promise<Feedback | null> {
		const data = this.ormRepository.createQueryBuilder('feedback')
			.select([
				'feedback.id',
				'feedback.description',
				'feedback.type',
				'feedback.created_at',
				'project.id',
				'project.name',
				'customer.id',
				'customer.name',
				'resource.id',
				'resource.name',
				'reporter.id',
				'reporter.name'
			])
			.leftJoin('feedback.resource', 'resource')
			.leftJoin('feedback.reporter', 'reporter')
			.leftJoin('feedback.project', 'project')
			.leftJoin('feedback.customer', 'customer')
			.where('feedback.id = :feedback_id', { feedback_id })

		return await data.getOne()
	}

	async create(data: ICreateFeedback): Promise<Feedback> {
		const feedbackCreated = this.ormRepository.create(data)

		return await this.ormRepository.save(feedbackCreated)
	}

	async filter(resource_id: number, type: string): Promise<Feedback[]> {
		const data = this.ormRepository.createQueryBuilder('feedback')
			.select([
				'feedback.id',
				'feedback.description',
				'feedback.type',
				'feedback.created_at',
				'project.id',
				'project.name',
				'customer.id',
				'customer.name',
				'resource.id',
				'resource.name',
				'reporter.id',
				'reporter.name'
			])
			.leftJoin('feedback.resource', 'resource')
			.leftJoin('feedback.reporter', 'reporter')
			.leftJoin('feedback.project', 'project')
			.leftJoin('feedback.customer', 'customer')
			.orderBy('feedback.id', 'DESC')

		if (type) data.where('feedback.type LIKE :type', { type })
		if (resource_id) data.andWhere('feedback.resource_id LIKE :resource_id', { resource_id })

		return await data.getMany()
	}
}
