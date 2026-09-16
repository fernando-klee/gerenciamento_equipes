import { inject, injectable } from 'tsyringe'

import IProjectsResourcesRepository from '../../Projects/repositories/IProjectsResourcesRepository'

@injectable()
export default class ListProjectsResourceByResourceId {
	constructor(
		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository,
	) { }

	async execute(resource_id: number): Promise<any> {
		const projectResources = await this.projectsResourcesRepository.getResourceHoursLeft(resource_id)

		return projectResources
	}
}
