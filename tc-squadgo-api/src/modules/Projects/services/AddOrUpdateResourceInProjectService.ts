import { inject, injectable } from 'tsyringe'

import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import IProjectsResourcesRepository from '../repositories/IProjectsResourcesRepository'
import IAddOrUpdateResourceToProjectDTO from '../dtos/IAddOrUpdateResourceToProjectDTO'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import ProjectNotFoundException from '../../../shared/infra/exceptions/ProjectNotFoundException'
import ProjectResource from '../infra/typeorm/entities/ProjectResource'
import ICreateProjectHistoricService from '../providers/interfaces/ICreateProjectHistoricService'
import IUsersRepository from '../../Accounts/repositories/IUsersRepository'
import UserNotFoundException from '../../../shared/infra/exceptions/UserNotFoundException'
import ICreateResourceStatus from '../../Resources/providers/interfaces/ICreateResourceStatus'
import IGetResourceAvailableHours from '../../Resources/providers/interfaces/IGetResourceAvailableHours'
import ICreateResourceHistoricService from '../../Resources/providers/interfaces/ICreateResourceHistoricService'
import ICreateResourceProjectHistoricService from '../../Resources/providers/interfaces/ICreateResourceProjectHistoricService'

@injectable()
export default class AddOrUpdateResourceInProjectService {

	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('ProjectsRepository')
		private projectsRepository: IResourcesRepository,

		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository,

		@inject('CreateProjectHistoricService')
		private createProjectHistoricService: ICreateProjectHistoricService,

		@inject('CreateResourceStatus')
		private createResourceStatus: ICreateResourceStatus,

		@inject('GetResourceAvailableHours')
		private getResourceAvailableHours: IGetResourceAvailableHours,

		@inject('CreateResourceHistoricService')
		private createResourceHistoricService: ICreateResourceHistoricService,

		@inject('CreateResourceProjectHistoricService')
		private createResourceProjectHistoricService: ICreateResourceProjectHistoricService
	) { }

	async execute(data: IAddOrUpdateResourceToProjectDTO): Promise<ProjectResource> {
		const { user_id, resource_id, project_id, hours_amount } = data

		const userExists = await this.resourcesRepository.findByRegistry(user_id)
		if (!userExists) throw new UserNotFoundException()

		const resourceExists = await this.resourcesRepository.findById(resource_id)
		if (!resourceExists) throw new ResourceNotFoundException()

		const projectExists = await this.projectsRepository.findById(project_id)
		if (!projectExists) throw new ProjectNotFoundException()

		let projectResourceExists = await this.projectsResourcesRepository.findByResourceIdAndProjectId(resource_id, project_id)
		if (projectResourceExists) {
			if (projectResourceExists.hours_amount !== hours_amount) {
				const type = projectResourceExists.hours_amount > hours_amount ? 'DECREASE_RESOURCE_HOURS' : 'INCREASE_RESOURCE_HOURS'

				await this.createResourceHistoricService.execute({
					resource_id: resource_id,
					description: `Mudou a carga horária de "${projectResourceExists.hours_amount}" para "${hours_amount}" no projeto "${projectExists.name}".`,
					type: 'CHANGE_PROJECT_HOURS'
				})

				await this.createProjectHistoricService.execute({
					description: `${this.addStrongTag(userExists.name)} alterou as horas do recurso ${this.addStrongTag(resourceExists.name)} de ${this.addStrongTag(projectResourceExists.hours_amount + 'h')} para ${this.addStrongTag(hours_amount + 'h')}.`,
					project_id,
					type
				})
				projectResourceExists.hours_amount = hours_amount

				projectResourceExists = await this.projectsResourcesRepository.save(projectResourceExists)
			}
		} else {
			await this.createResourceProjectHistoricService.execute(
				resource_id, project_id
			)

			await this.createResourceHistoricService.execute({
				resource_id: resource_id,
				description: `Entrou no projeto "${projectExists.name}".`,
				type: 'ADD_PROJECT'
			})

			await this.createProjectHistoricService.execute({
				description: `${this.addStrongTag(userExists.name)} adicionou o recurso ${this.addStrongTag(resourceExists.name)}.`,
				project_id,
				type: 'ADD_RESOURCE'
			})
			projectResourceExists = await this.projectsResourcesRepository.save(data)
		}

		const hasResourceProjects = await this.projectsResourcesRepository.listByResourceIdWithRelations(resource_id)
		const has_projects = hasResourceProjects.length > 0 ? true : false

		const { resource_hours, available_hours } = await this.getResourceAvailableHours.execute(resource_id)
		await this.createResourceStatus.execute({
			resource_id,
			status: 'ATIVO',
			hours_left: available_hours,
			resource_hours,
			has_projects
		})

		return projectResourceExists
	}

	private addStrongTag(text: any): string {
		return `<strong>${text}</strong>`
	}

}
