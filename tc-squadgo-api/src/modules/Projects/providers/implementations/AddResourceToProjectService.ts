import { inject, injectable } from 'tsyringe'
import IProjectsResourcesRepository from '../../repositories/IProjectsResourcesRepository'
import ProjectResource from '../../infra/typeorm/entities/ProjectResource'
import IAddResourceToProjectService from '../interfaces/IAddResourceToProjectService'
import IAddResourceToProjectDTO from '../dtos/IAddResourceToProjectDTO'

@injectable()
export default class AddResourceToProjectService implements IAddResourceToProjectService {
	constructor(
		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository
	) { }

	async execute(data: IAddResourceToProjectDTO): Promise<ProjectResource> {
        return await this.projectsResourcesRepository.save(data)
	}
}
