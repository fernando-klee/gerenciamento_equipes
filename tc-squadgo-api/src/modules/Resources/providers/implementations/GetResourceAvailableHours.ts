import { inject, injectable } from 'tsyringe'
import IResourcesRepository from '../../repositories/IResourcesRepository'
import IProjectsResourcesRepository from '../../../Projects/repositories/IProjectsResourcesRepository'
import ResourceNotFoundException from '../../../../shared/infra/exceptions/ResourceNotFoundException'
import IGetResourceAvailableHours from '../interfaces/IGetResourceAvailableHours'
import ResourceAvailableHoursDTO from '../dtos/ResourceAvailableHoursDTO'

@injectable()
export default class GetResourceAvailableHours implements IGetResourceAvailableHours {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository,

	) { }

	async execute(resource_id: number): Promise<ResourceAvailableHoursDTO> {
		const resourceExistsById = await this.resourcesRepository.findById(resource_id)
		if (!resourceExistsById) throw new ResourceNotFoundException()

		const resource_hours = resourceExistsById.hours_amount

		const hours_used_now = await this.projectsResourcesRepository.getResourceHoursLeft(resource_id)
		if (hours_used_now) {
			const available_hours = resource_hours - hours_used_now.hours_amount
			return { resource_hours, available_hours }
		}

		return { resource_hours, available_hours: resource_hours }
	}
}
