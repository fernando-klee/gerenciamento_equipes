import { inject, injectable } from 'tsyringe'

import { instanceToInstance } from 'class-transformer'

import IProjectsResourcesRepository from '../repositories/IProjectsResourcesRepository'
import ProjectNotFoundException from '../../../shared/infra/exceptions/ProjectNotFoundException'
import IGetResourceAvailableHours from '../../Resources/providers/interfaces/IGetResourceAvailableHours'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'

@injectable()
export default class ListProjectResourcesService {
	constructor(
		@inject('GetResourceAvailableHours')
		private getResourceAvailableHours: IGetResourceAvailableHours,

		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository,

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository
	) {}

	async execute(project_id: number): Promise<any> {
		let projectResource: any[] =
			await this.projectsResourcesRepository.listResourcesByProject(project_id)
		if (!projectResource) throw new ProjectNotFoundException()

		let totalHoursAmount = 0

		const theResources = await this.resourcesRepository.list()
		console.log(theResources)

		projectResource = await Promise.all(
			projectResource.map(async (pr) => {
				const { resource } = pr
				const { available_hours, resource_hours } =
					await this.getResourceAvailableHours.execute(pr.resource.id)

				totalHoursAmount += pr.hours_amount

				const correspondingResource = theResources.find(
					(r) => r.id === resource.id
				)

				const departure_forecast = correspondingResource
					? correspondingResource.departure_forecast
					: null

				Object.assign(resource, {
					hours_left: available_hours,
					hours_amount: resource_hours,
					project_hours: pr.hours_amount,
					departure_forecast: departure_forecast,
				})

				return resource
			})
		)

		const result = {
			projectResource,
			totalHoursAmount,
		}

		return instanceToInstance(result)
	}
}
