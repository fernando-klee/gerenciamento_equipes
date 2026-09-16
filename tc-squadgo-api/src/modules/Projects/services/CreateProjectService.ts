import { inject, injectable } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'

import Project from '../infra/typeorm/entities/Project'
import ICustomersRepository from '../../Customers/repositories/ICustomersRepository'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import IProjectsRepository from '../repositories/IProjectsRepository'
import CustomerNotFoundException from '../../../shared/infra/exceptions/CustomerNotFoundException'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import ProjectNotFoundException from '../../../shared/infra/exceptions/ProjectNotFoundException'
import IProjectsResourcesRepository from '../repositories/IProjectsResourcesRepository'
import ICreateNotificationService from '../../Notifications/interfaces/ICreateNotificationService'
import IUsersRepository from '../../Accounts/repositories/IUsersRepository'
import UserNotFoundException from '../../../shared/infra/exceptions/UserNotFoundException'
import IGetResourceAvailableHours from '../../Resources/providers/interfaces/IGetResourceAvailableHours'
import ICreateResourceStatus from '../../Resources/providers/interfaces/ICreateResourceStatus'
import ICreateProjectPropsHistoricService from '../providers/interfaces/ICreateProjectPropsHistoricService'
import ICreateProjectHistoricService from '../providers/interfaces/ICreateProjectHistoricService'
import ICreateResourceHistoricService from '../../Resources/providers/interfaces/ICreateResourceHistoricService'
import ICloseProjectsService from '../providers/interfaces/ICloseProjectsService'
import Resource from '../../Resources/infra/typeorm/entities/Resource'
import ICreateResourceProjectHistoricService from '../../Resources/providers/interfaces/ICreateResourceProjectHistoricService'

interface ICreateResponsibleHistoric {
	projectName: string
	oldResponsible?: Resource
	newResponsible?: Resource
}

interface IRequest {
	user_id: string
	name: string
	status: string
	type: string
	hours: number
	responsible_id?: number
	start_estimate: Date
	end_estimate: Date
	customer_id: number
	resources: [{
		resource_id: number
		hours_amount: number
	}]
	// customer_poc: string
}

@injectable()
export default class CreateProjectService {
	constructor(
		@inject('ProjectsRepository')
		private projectsRepository: IProjectsRepository,

		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository,

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository,

		@inject('CreateNotificationService')
		private createNotificationService: ICreateNotificationService,

		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('GetResourceAvailableHours')
		private getResourceAvailableHours: IGetResourceAvailableHours,

		@inject('CreateResourceStatus')
		private createResourceStatus: ICreateResourceStatus,

		@inject('CreateProjectPropsHistoricService')
		private createProjectPropsHistoricService: ICreateProjectPropsHistoricService,

		@inject('CreateProjectHistoricService')
		private createProjectHistoricService: ICreateProjectHistoricService,

		@inject('CreateResourceHistoricService')
		private createResourceHistoricService: ICreateResourceHistoricService,

		@inject('CloseProjectService')
		private closeProjectService: ICloseProjectsService,

		@inject('CreateResourceProjectHistoricService')
		private createResourceProjectHistoricService: ICreateResourceProjectHistoricService
	) { }

	async execute(data: IRequest): Promise<Project> {
		const {
			user_id,
			name,
			status,
			type,
			hours,
			responsible_id,
			start_estimate,
			end_estimate,
			customer_id,
			resources,
			// customer_poc
		} = data

		const userExists = await this.resourcesRepository.findByRegistry(user_id)
		if (!userExists) throw new UserNotFoundException()

		const customerExists = await this.customersRepository.findById(customer_id)
		if (!customerExists) throw new CustomerNotFoundException()

		const project = new Project()
		Object.assign(project, {
			name,
			status,
			type,
			hours,
			start_estimate,
			end_estimate,
			customer_id,
			// customer_poc
		})

		console.log(project)

		if (responsible_id) {
			const responsibleExists = await this.resourcesRepository.findById(responsible_id)
			if (!responsibleExists) throw new ResourceNotFoundException()

			Object.assign(project, {
				responsible_id,
			})

			await this.changeResponsibleHistoric({projectName: name, newResponsible: responsibleExists})
		}

		const projectCreated = await this.projectsRepository.save(project)

		const projectResources = resources.map(r => {
			return { ...r, project_id: projectCreated.id }
		})

		await this.projectsResourcesRepository.saveAll(projectResources)

		const projectSaved = await this.projectsRepository.findById(projectCreated.id)
		if (!projectSaved) throw new ProjectNotFoundException()

		await this.createProjectPropsHistoricService.execute({ oldProject: null, newProject: projectSaved, username: userExists.name })

		const projectSavedResources = projectSaved.resources

		const __resources__ = await Promise.all(projectSavedResources.map(async r => {
			const resourceProjectHour = await this.projectsResourcesRepository.findByResourceIdAndProjectId(r.id, projectSaved.id)
			const { resource_hours, available_hours } = await this.getResourceAvailableHours.execute(r.id)

			const has_projects = !!resourceProjectHour

			await this.createResourceStatus.execute({
				resource_id: r.id,
				status: r.resourceStatus.status.name,
				hours_left: available_hours,
				resource_hours,
				has_projects
			})

			await this.createProjectHistoricService.execute({
				description: `${this.addStrongTag(userExists.name)} adicionou o recurso ${this.addStrongTag(r.name)}.`,
				project_id: projectSaved.id,
				type: 'ADD_RESOURCE'
			})

			await this.createResourceHistoricService.execute({
				resource_id: r.id,
				description: `Entrou no projeto ${projectSaved.name}.`,
				type: 'ADD_PROJECT'
			})

			await this.createResourceProjectHistoricService.execute(
				r.id, projectSaved.id
			)

			const resourceWithPhoto = instanceToInstance(r)

			return { ...resourceWithPhoto, hours_left: available_hours, project_hours: resourceProjectHour?.hours_amount ?? 0 }
		}))

		projectSaved.resources = __resources__ as any

		this.createNotificationService.execute({
			description: `${userExists.name} cadastrou um novo projeto: ${name}`,
			object_type: 'notify_new_project',
			type: 'PROJECTS',
			object_id: projectCreated.id
		})

		if(status === 'CONCLUIDO') {
			await this.closeProjectService.execute(user_id, projectSaved.id)
		}

		if (responsible_id) {
			const responsibleExists = await this.resourcesRepository.findById(responsible_id)
			if (!responsibleExists) throw new ResourceNotFoundException()

			await this.createResourceProjectHistoricService.execute(
				responsibleExists.id, projectSaved.id
			)
		}

		return instanceToInstance(projectSaved)
	}

	private async changeResponsibleHistoric(data: ICreateResponsibleHistoric) {
		const { projectName, oldResponsible, newResponsible } = data
		if (newResponsible) {
			if (!oldResponsible || oldResponsible && oldResponsible.id !== newResponsible.id) {
				await this.createResourceHistoricService.execute({
					resource_id: newResponsible.id,
					type: 'BECOME_RESPONSIBLE',
					description: `${newResponsible.name} se tornou responsável no projeto "${projectName}".`
				})
			}
		}
	}

	private addStrongTag(text: any): string {
		return `<strong>${text}</strong>`
	}
}
