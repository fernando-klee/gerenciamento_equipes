import { inject, injectable } from 'tsyringe'
import { isAfter } from 'date-fns'

import IProjectsResourcesRepository from '../../../Projects/repositories/IProjectsResourcesRepository'
import IProjectsRepository from '../../../Projects/repositories/IProjectsRepository'
import IResourcesRepository from '../../../Resources/repositories/IResourcesRepository'
import GetResourcesHoursDTO from '../../dtos/GetResourcesHoursDTO'
import IGetResourcesHours from '../interfaces/IGetAllResourcesHours'
import IGetResourceAvailableHours from '../../../Resources/providers/interfaces/IGetResourceAvailableHours'

@injectable()
export default class GetAllResourcesHours implements IGetResourcesHours {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('ProjectsRepository')
		private projectsRepository: IProjectsRepository,

		@inject('GetResourceAvailableHours')
		private getResourceAvailableHours: IGetResourceAvailableHours,

		@inject('ProjectsResourcesRepository')
		private projectsResourcesRepository: IProjectsResourcesRepository
	) { }

	async execute(): Promise<GetResourcesHoursDTO> {
		const [allResources, activesProjectsResources, projects] = await Promise.all(
			[this.resourcesRepository.list(), this.projectsResourcesRepository.listAllActives(), this.projectsRepository.listActives()]
		)

		let totalHoursHappening = 0
		let allResourcesHours = 0
		let totalHoursHappeningWithoutExceeds = 0
		let totalExcededHours = 0

		await Promise.all(allResources.map(async r => {
			const isResourceActive = r.resourceStatus && r.resourceStatus.status && r.resourceStatus.status.name !== 'INATIVO'
			const isResourceNotManager = r.resourceClassification && r.resourceClassification.classification && r.resourceClassification.classification.description !== 'Gestor'

			console.log(r.resourceClassification)

			if (isResourceActive && isResourceNotManager) {
				allResourcesHours = allResourcesHours + r.hours_amount
			}

			const { available_hours } = await this.getResourceAvailableHours.execute(r.id)

			if (available_hours < 0) {
				totalExcededHours = totalExcededHours + Math.abs(available_hours)
			}
		}))

		let allProjectsHours = 0

		const [, allProjects] = await Promise.all(
			[
				activesProjectsResources.map(hoursHappening => {
					totalHoursHappening = totalHoursHappening + hoursHappening.hours_amount
				}), this.projectsRepository.list()
			]
		)

		await Promise.all(allProjects.map(async p => {
			if (p.start_estimate && isAfter(p.start_estimate, new Date())) {
				allProjectsHours = allProjectsHours + p.hours
			}
		}))

		let allHoursActivesProjects = 0

		await Promise.all(projects.map(p => {
			allHoursActivesProjects = allHoursActivesProjects + p.hours
		}))

		totalHoursHappeningWithoutExceeds = totalHoursHappening - totalExcededHours

		return { allResourcesHours, totalHoursHappening, totalHoursHappeningWithoutExceeds, totalExcededHours, allProjectsHours, allHoursActivesProjects }
	}
}
