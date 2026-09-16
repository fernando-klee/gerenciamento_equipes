import { inject, injectable } from 'tsyringe'

import IProjectsRepository from '../../repositories/IProjectsRepository'
import IProjectsResourcesRepository from '../../repositories/IProjectsResourcesRepository'
import ProjectNotFoundException from '../../../../shared/infra/exceptions/ProjectNotFoundException'
import ICloseProjectsService from '../interfaces/ICloseProjectsService'
import ICreateProjectHistoricService from '../interfaces/ICreateProjectHistoricService'
import UserNotFoundException from '../../../../shared/infra/exceptions/UserNotFoundException'
import ICreateResourceStatus from '../../../Resources/providers/interfaces/ICreateResourceStatus'
import IGetResourceAvailableHours from '../../../Resources/providers/interfaces/IGetResourceAvailableHours'
import ICreateResourceHistoricService from '../../../Resources/providers/interfaces/ICreateResourceHistoricService'
import IResourcesRepository from '../../../Resources/repositories/IResourcesRepository'

@injectable()
export default class CloseProjectService implements ICloseProjectsService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('ProjectsRepository')
		private projectsRepository: IProjectsRepository,

		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository,

		@inject('CreateProjectHistoricService')
		private createProjectHistoricService: ICreateProjectHistoricService,

		@inject('CreateResourceStatus')
		private createResourceStatus: ICreateResourceStatus,

		@inject('GetResourceAvailableHours')
		private getResourceAvailableHours: IGetResourceAvailableHours,

		@inject('CreateResourceHistoricService')
		private createResourceHistoricService: ICreateResourceHistoricService
	) { }

	async execute(user_id: string, project_id: number): Promise<void> {
		const userExists = await this.resourcesRepository.findByRegistry(user_id)
		if (!userExists) throw new UserNotFoundException()

		const projectExists = await this.projectsRepository.findById(project_id)
		if (!projectExists) throw new ProjectNotFoundException()

		let projectResources = await this.projectsResourcesRepository.listByProject(project_id)

		if(projectExists.responsible) {
			await this.createResourceHistoricService.execute({
				resource_id: projectExists.responsible?.id,
				description: `Concluiu o projeto "${projectExists.name}" como responsável.`,
				type: 'REMOVE_PROJECT'
			})
		}

		if (projectResources.length > 0) {

			projectResources = await Promise.all(projectResources.map(async pr => {
				const { resource_hours, available_hours } = await this.getResourceAvailableHours.execute(pr.resource.id)

				const hours_left = available_hours + pr.hours_amount

				await this.createResourceStatus.execute({
					resource_id: pr.resource.id,
					has_projects: true,
					hours_left,
					resource_hours,
					status: 'ATIVO'
				})

				if(projectExists.responsible) {
					if(projectExists.responsible.id !== pr.resource.id) {
						await this.createResourceHistoricService.execute({
							resource_id: pr.resource.id,
							description: `Concluiu o projeto "${projectExists.name}".`,
							type: 'REMOVE_PROJECT'
						})
					}
				}

				await this.createProjectHistoricService.execute({
					description: `${this.addStrongTag(userExists.name)} alterou as horas do recurso ${this.addStrongTag(pr.resource.name)} de ${this.addStrongTag(pr.hours_amount + 'h')} para ${this.addStrongTag('0h')}`,
					project_id,
					type: 'DECREASE_RESOURCE_HOURS'
				})
				return { ...pr, hours_amount: 0 }
			}))

			await this.projectsResourcesRepository.saveAll(projectResources)
		}
	}

	private addStrongTag(text: any): string {
		return `<strong>${text}</strong>`
	}
}
