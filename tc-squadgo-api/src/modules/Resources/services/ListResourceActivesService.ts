import { instanceToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'
import IProjectsResourcesRepository from '../../../modules/Projects/repositories/IProjectsResourcesRepository'
import IResourcesRepository from '../repositories/IResourcesRepository'

@injectable()
export default class ListResourceActivesService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository
	) { }

	async execute(): Promise<any> {
		const resources = await this.resourcesRepository.listActives()
		const resourcesWithHours = Promise.all(resources.map(async r => {
			const resourcesProjects = await this.projectsResourcesRepository.listByResourceId(r.id)

			const resourceUsedHours = resourcesProjects.reduce((prev, next) => ({ hours_amount: prev.hours_amount + next.hours_amount }), { hours_amount: 0 })

			const resourceAvailableHours = r.hours_amount - resourceUsedHours.hours_amount

			return { ...r, hours_left: resourceAvailableHours, photo_url: r.getPhotoUrl() }
		}))

		return instanceToInstance(resourcesWithHours)
	}
}
