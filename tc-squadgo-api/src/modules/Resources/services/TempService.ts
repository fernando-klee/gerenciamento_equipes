import { inject, injectable } from 'tsyringe'

import IProjectsRepository from '../../Projects/repositories/IProjectsRepository'
import IProjectsResourcesRepository from '../../Projects/repositories/IProjectsResourcesRepository'
import ICreateResourceProjectHistoricService from '../providers/interfaces/ICreateResourceProjectHistoricService'

@injectable()
export default class TempService {
	constructor(
		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository,

		@inject('CreateResourceProjectHistoricService')
		private createResourceProjectHistoricService: ICreateResourceProjectHistoricService,

		@inject('ProjectsRepository')
		private projectsRepository: IProjectsRepository
	) { }

	async execute(): Promise<void> {
		const allResources = await this.projectsResourcesRepository.list()
		const projects = await this.projectsRepository.list()

		await Promise.all(allResources.map(async r => {
			await this.createResourceProjectHistoricService.execute(r.resource_id, r.project_id)
		}))

		await Promise.all(projects.map(async p => {
			if(p.responsible) {
				await this.createResourceProjectHistoricService.execute(p.responsible.id, p.id)
			}
		}))

	}

}
