import { instanceToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'

import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import IProjectsResourcesRepository from '../../Projects/repositories/IProjectsResourcesRepository'
import IGetResourceAvailableHours from '../providers/interfaces/IGetResourceAvailableHours'
import IResourcesRepository from '../repositories/IResourcesRepository'

@injectable()
export default class ListProjectsByResourceService {
	constructor(
		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository,

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('GetResourceAvailableHours')
		private getResourceAvailableHours: IGetResourceAvailableHours
	) { }

	async execute(resource_id: number): Promise<any> {
		const resourceExists = await this.resourcesRepository.findById(resource_id)
		if (!resourceExists) throw new ResourceNotFoundException()

		const [resourceHours, projects] = await Promise.all(
			[
				this.getResourceAvailableHours.execute(resource_id),
				this.projectsResourcesRepository.listByResourceIdWithRelations(resource_id)
			]
		)

		const { resource_hours, available_hours } = resourceHours

		const resourceProjectHours = {
			resource_hours,
			available_hours,
			projects: instanceToInstance(projects)
		}

		return resourceProjectHours
	}
}
