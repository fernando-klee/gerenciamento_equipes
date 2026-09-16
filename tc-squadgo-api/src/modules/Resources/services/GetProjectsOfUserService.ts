import { inject, injectable } from 'tsyringe'
import IProjectsRepository from '../../Projects/repositories/IProjectsRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import IResourcesRepository from '../repositories/IResourcesRepository'
import IProjectsResourcesRepository from '../../Projects/repositories/IProjectsResourcesRepository'

@injectable()
export default class GetProjectsOfUserService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('ProjectsRepository')
		private projectsRepository: IProjectsRepository,

		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository
	) { }

	async execute(resource_id: number): Promise<any> {
		const resourceExists = await this.resourcesRepository.findById(resource_id)
		if (!resourceExists) throw new ResourceNotFoundException()

		const resourceProjects = await this.projectsResourcesRepository.listByResourceId(resource_id)

		const projectsResponsible = await this.projectsRepository.listByResponsibleId(resource_id)

		return { projects_responsible: projectsResponsible.length, projects_as_resource: resourceProjects.length }
	}
}
