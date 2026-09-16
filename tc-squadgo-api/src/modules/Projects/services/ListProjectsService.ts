import { inject, injectable } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'

import IProjectsRepository from '../repositories/IProjectsRepository'
import Project from '../infra/typeorm/entities/Project'

@injectable()
export default class ListProjectsService {
	constructor(
		@inject('ProjectsRepository')
		private projectsRepository: IProjectsRepository
	) { }

	async execute(): Promise<Project[]> {
		let projects = await this.projectsRepository.list()
		projects = projects.map(p => {
			return { ...p, resources: [] }
		})

		projects.sort((a, b) => (a.customer.name > b.customer.name) ? 1 : -1)

		return instanceToInstance(projects)
	}
}
