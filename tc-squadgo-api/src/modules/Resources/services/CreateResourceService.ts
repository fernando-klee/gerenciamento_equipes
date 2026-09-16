import { inject, injectable } from 'tsyringe'

import { addYears } from 'date-fns'
import ResourceAlreadyExistsException from '../../../shared/infra/exceptions/ResourceAlreadyExistsException'
import Resource from '../infra/typeorm/entities/Resource'
import IResourcesRepository from '../repositories/IResourcesRepository'
import ICreateNotificationService from '../../Notifications/interfaces/ICreateNotificationService'
import ITypesRepository from '../repositories/ITypesRepository'
import IUsersRepository from '../../Accounts/repositories/IUsersRepository'
import UserNotFoundException from '../../../shared/infra/exceptions/UserNotFoundException'
import ICreateResourceStatus from '../providers/interfaces/ICreateResourceStatus'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import IClassificationsRepository from '../repositories/IClassificationsRepository'
import IResourcesClassificationsRepository from '../repositories/IResourcesClassificationsRepository'
import ClassificationNotFoundException from '../../../shared/infra/exceptions/ClassificationNotFoundException'
import ICreateResourceHistoricService from '../providers/interfaces/ICreateResourceHistoricService'

interface IRequest {
	user_id: string
	name: string
	email: string
	status: string
	hours_amount: number
	classification_id: number
	leader: boolean
	types_ids: number[]
	admission_date: Date
	vacation_date: Date | null
}

@injectable()
export default class CreateResourceService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('CreateNotificationService')
		private createNotificationService: ICreateNotificationService,

		@inject('TypesRepository')
		private typesRepository: ITypesRepository,

		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('CreateResourceStatus')
		private createResourceStatus: ICreateResourceStatus,

		@inject('ClassificationsRepository')
		private classificationsRepository: IClassificationsRepository,

		@inject('ResourcesClassificationsRepository')
		private resourcesClassificationsRepository: IResourcesClassificationsRepository,

		@inject('CreateResourceHistoricService')
		private createResourceHistoricService: ICreateResourceHistoricService
	) { }

	async execute(data: IRequest): Promise<Resource> {
		const { user_id, name, email, status, leader, classification_id, hours_amount, types_ids, vacation_date, admission_date } = data

		const userExists = await this.resourcesRepository.findByRegistry(user_id)
		if (!userExists) throw new UserNotFoundException()

		const resourceExistsByEmail = await this.resourcesRepository.findByEmail(email)
		if (resourceExistsByEmail) throw new ResourceAlreadyExistsException()

		const typesFounded = await this.typesRepository.listByIds(types_ids)

		let vacationDate = vacation_date

		if(!vacation_date) vacationDate = addYears(admission_date, 1)

		const resource = new Resource()
		Object.assign(resource, {
			name,
			email,
			status: 'DISPONIVEL',
			hours_amount,
			types: typesFounded,
			leader,
			admission_date,
			vacation_date: vacationDate
		})

		const resourceCreated = await this.resourcesRepository.save(resource)

		this.createNotificationService.execute({
			description: `${userExists.name} cadastrou um novo colaborador: ${name}`,
			object_type: 'notify_new_resource',
			type: 'RESOURCES',
			object_id: resourceCreated.id
		})

		await this.createResourceClassification(resourceCreated.id, classification_id)

		await this.createResourceStatus.execute({
			resource_id: resourceCreated.id,
			hours_left: resourceCreated.hours_amount,
			resource_hours: resourceCreated.hours_amount,
			has_projects: false,
			status
		})

		const resourceCreatedWithRelations = await this.resourcesRepository.findById(resourceCreated.id)
		if (!resourceCreatedWithRelations) throw new ResourceNotFoundException()

		await this.createResourceHistoricService.execute({
			resource_id: resourceCreated.id,
			description: `${resourceCreated.name} ingressou no sistema.`,
			type: 'RESOURCE_CREATED'
		})

		return resourceCreatedWithRelations
	}

	private async createResourceClassification(resource_id: number, classification_id: number): Promise<void> {
		const classificationExists = await this.classificationsRepository.findById(classification_id)
		if (!classificationExists) throw new ClassificationNotFoundException()

		await this.resourcesClassificationsRepository.findCreateOrUpdate(resource_id, classification_id)
	}

}
