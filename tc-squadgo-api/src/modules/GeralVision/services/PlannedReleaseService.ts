import { injectable, inject } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'

import IProjectsResourcesRepository from '../../Projects/repositories/IProjectsResourcesRepository'
import ProjectResource from '../../Projects/infra/typeorm/entities/ProjectResource'
import { format } from 'date-fns'

@injectable()
export default class PlannedReleaseService {
	constructor(
		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository
	) { }

	async execute(date: Date): Promise<ProjectResource[]> {
		const plannedReleased = await this.projectsResourcesRepository.listFutureProjectsByDate(format(date, 'yyyy-MM'))
		return instanceToInstance(plannedReleased)
	}
}
