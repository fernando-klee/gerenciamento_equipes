import { instanceToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'
import IProjectsResourcesRepository from '../../../modules/Projects/repositories/IProjectsResourcesRepository'
import IResourcesRepository from '../repositories/IResourcesRepository'

@injectable()
export default class ListResourceService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository
	) {}

	async execute(): Promise<any> {
		const [resources, resourcesProjects]: any[] = await Promise.all([
			this.resourcesRepository.list(),
			this.projectsResourcesRepository.listResourcesWithHoursLeft(),
		])

		const resourcesRefactored = await Promise.all(
			resources.map(async (r: any) => {
				const resourceInProjects = resourcesProjects.find(
					(rp: any) => rp.id === r.id
				)
				const resourceComplete = instanceToInstance(r)

				if (resourceInProjects) {
					const available_hours =
						r.hours_amount - (resourceInProjects.hours_amount || 0)
					return {
						...resourceComplete,
						hours_left: available_hours,
						has_projects: true,
					}
				} else {
					return {
						...resourceComplete,
						hours_left: r.hours_amount,
						has_projects: false,
					}
				}
			})
		)

		return instanceToInstance(resourcesRefactored)
	}
}
