import { inject, injectable } from 'tsyringe'

import IProjectsRepository from '../../Projects/repositories/IProjectsRepository'
import Project from '../../Projects/infra/typeorm/entities/Project'

@injectable()
export default class ListProjectsWithTypeService {
	constructor(
		@inject('ProjectsRepository')
		private projectsRepository: IProjectsRepository
	) { }

	async execute(): Promise<Project[]> {
		return await this.projectsRepository.listWithType()
	}
}
