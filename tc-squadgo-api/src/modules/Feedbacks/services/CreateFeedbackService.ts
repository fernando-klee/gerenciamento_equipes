import { inject, injectable } from 'tsyringe'
import ICustomersRepository from '../../Customers/repositories/ICustomersRepository'
import IProjectsRepository from '../../Projects/repositories/IProjectsRepository'
import CustomerNotFoundException from '../../../shared/infra/exceptions/CustomerNotFoundException'
import ProjectNotFoundException from '../../../shared/infra/exceptions/ProjectNotFoundException'
import UserNotFoundException from '../../../shared/infra/exceptions/UserNotFoundException'
import IResourcesRepository from '../../../modules/Resources/repositories/IResourcesRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import ICreateFeedback from '../dtos/ICreateFeedback'
import Feedback from '../infra/typeorm/entities/Feedback'
import IFeedbacksRepository from '../repositories/IFeedbacksRepository'
import FeedbackNotFoundException from '../../../shared/infra/exceptions/CustomerNotFoundException copy'
import ICreateResourceHistoricService from '../../Resources/providers/interfaces/ICreateResourceHistoricService'
import IUsersRepository from '../../Accounts/repositories/IUsersRepository'

@injectable()
export default class CreateFeedbackService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('FeedbacksRepository')
		private feedbacksRepository: IFeedbacksRepository,

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('ProjectsRepository')
		private projectsRepository: IProjectsRepository,

		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,

		@inject('CreateResourceHistoricService')
		private createResourceHistoricService: ICreateResourceHistoricService
	) { }

	async execute(data: ICreateFeedback): Promise<Feedback> {
		const {
			description,
			type,
			reporter_id,
			project_id,
			customer_id,
			resource_id } = data

		const resporterExists = await this.resourcesRepository.findById(reporter_id)
		if (!resporterExists) throw new UserNotFoundException()

		const resourceExists = await this.resourcesRepository.findById(resource_id)
		if (!resourceExists) throw new ResourceNotFoundException()

		if (type === 'PROJECT') {
			if (project_id) {
				const projectExists = await this.projectsRepository.findById(project_id)
				if (!projectExists) throw new ProjectNotFoundException()
				const customerExists = await this.customersRepository.findById(customer_id!)
				if (!customerExists) throw new CustomerNotFoundException()

				await this.createResourceHistoricService.execute({
					resource_id,
					description: `Recebeu um feedback do projeto "${projectExists.name}" do cliente "${customerExists.name}".`,
					type: 'NEW_FEEDBACK'
				})
			}
		} else if (type === 'CUSTOMER') {
			if (customer_id) {
				const customerExists = await this.customersRepository.findById(customer_id)
				if (!customerExists) throw new CustomerNotFoundException()
				const projectExists = await this.projectsRepository.findById(project_id!)
				if (!projectExists) throw new ProjectNotFoundException()

				await this.createResourceHistoricService.execute({
					resource_id,
					description: `Recebeu um feedback do cliente "${customerExists.name}" no projeto "${projectExists.name}".`,
					type: 'NEW_FEEDBACK'
				})
			}
		} else if (type === 'RESOURCE') {
			await this.createResourceHistoricService.execute({
				resource_id,
				description: `Recebeu um feedback de "${resporterExists.name}".`,
				type: 'NEW_FEEDBACK_RESOURCE'
			})
		} else {
			await this.createResourceHistoricService.execute({
				resource_id,
				description: `Recebeu um feedback de "${resporterExists.name}".`,
				type: 'NEW_FEEDBACK'
			})
		}

		const feedbackCreated = await this.feedbacksRepository.create({
			description,
			resource_id,
			reporter_id,
			type,
			project_id,
			customer_id
		})

		const feedbackRecovered = await this.feedbacksRepository.findById(feedbackCreated.id)
		if (!feedbackRecovered) throw new FeedbackNotFoundException()

		return feedbackRecovered
	}
}
