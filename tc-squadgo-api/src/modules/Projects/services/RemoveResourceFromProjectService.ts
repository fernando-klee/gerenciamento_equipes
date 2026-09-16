import { inject, injectable } from 'tsyringe'

import IUsersRepository from '../../Accounts/repositories/IUsersRepository'
import UserNotFoundException from '../../../shared/infra/exceptions/UserNotFoundException'
import ProjectResourceNotFoundException from '../../../shared/infra/exceptions/ProjectResourceNotFoundException'
import ICreateProjectHistoricService from '../providers/interfaces/ICreateProjectHistoricService'
import IProjectsResourcesRepository from '../repositories/IProjectsResourcesRepository'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import ICreateResourceHistoricService from '../../Resources/providers/interfaces/ICreateResourceHistoricService'
import ICreateResourceStatus from '../../Resources/providers/interfaces/ICreateResourceStatus'
import IGetResourceAvailableHours from '../../Resources/providers/interfaces/IGetResourceAvailableHours'

interface IRequest {
	user_id: string
	resource_id: number
	project_id: number
}

@injectable()
export default class RemoveResourceFromProjectService {
	constructor(
		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository,

		@inject('CreateProjectHistoricService')
		private createProjectHistoricService: ICreateProjectHistoricService,

		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('CreateResourceHistoricService')
		private createResourceHistoricService: ICreateResourceHistoricService,

		@inject('CreateResourceStatus')
		private createResourceStatus: ICreateResourceStatus,

		@inject('GetResourceAvailableHours')
		private getResourceAvailableHours: IGetResourceAvailableHours,
	) { }

	async execute(data: IRequest): Promise<void> {
		const { user_id, resource_id, project_id } = data

		const userExists = await this.resourcesRepository.findByRegistry(user_id)
		if (!userExists) throw new UserNotFoundException()

		const resourceExists = await this.resourcesRepository.findById(resource_id)
		if (!resourceExists) throw new ResourceNotFoundException()

		const resourceInProject = await this.projectsResourcesRepository.findByResourceIdAndProjectId(resource_id, project_id)
		if (!resourceInProject) throw new ProjectResourceNotFoundException()

		await this.createResourceHistoricService.execute({
			resource_id: resource_id,
			description: `Saiu do projeto "${resourceInProject.project.name}".`,
			type: 'REMOVE_PROJECT'
		})

		await this.createProjectHistoricService.execute({
			description: `${this.addStrongTag(userExists.name)} removeu o recurso ${this.addStrongTag(resourceExists.name)}.`,
			project_id,
			type: 'REMOVE_RESOURCE'
		})

		await this.projectsResourcesRepository.delete(resourceInProject)

		const { resource_hours, available_hours } = await this.getResourceAvailableHours.execute(resource_id)
		const has_projects = available_hours !== resourceExists.hours_amount

		await this.createResourceStatus.execute({
			resource_id,
			hours_left: available_hours,
			resource_hours,
			has_projects,
			status: resourceExists.resourceStatus.status.name
		})
	}

	private addStrongTag(text: any): string {
		return `<strong>${text}</strong>`
	}
}
