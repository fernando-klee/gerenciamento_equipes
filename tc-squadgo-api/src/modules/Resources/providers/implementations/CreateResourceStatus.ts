import { inject, injectable } from 'tsyringe'

import IResourceStatusRepository from '../../repositories/IResourceStatusRepository'
import ISubstatusRepository from '../../repositories/ISubstatusRepository'
import IStatusResourceRepository from '../../repositories/IStatusResourceRepository'
import ResourceStatus from '../../infra/typeorm/entities/ResourceStatus'
import SubstatusNotFoundException from '../../../../shared/infra/exceptions/SubstatusNotFoundException'
import CreateResourceSubstatusDTO from '../dtos/CreateResourceSubstatusDTO'
import ICreateResourceStatus from '../interfaces/ICreateResourceStatus'
import IResourcesRepository from '../../repositories/IResourcesRepository'
import ClassificationNotFoundException from '../../../../shared/infra/exceptions/ClassificationNotFoundException'

@injectable()
export default class CreateResourceStatus implements ICreateResourceStatus {
	constructor(

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('ResourceStatusRepository')
		private resourceStatusRepository: IResourceStatusRepository,

		@inject('StatusResourceRepository')
		private statusResourceRepository: IStatusResourceRepository,

		@inject('SubstatusRepository')
		private substatusRepository: ISubstatusRepository
	) { }

	async execute(data: CreateResourceSubstatusDTO): Promise<void> {
		const { resource_id, resource_hours, hours_left, status, has_projects } = data

		const resourceWithClassification = await this.resourcesRepository.findWithClassification(resource_id)
		if (!resourceWithClassification) throw new ClassificationNotFoundException()

		if (status === 'ATIVO') {
			if (resourceWithClassification.resourceClassification.classification.description === 'Gestor') {
				await this.saveResourceStatusActive(resource_id, 'DISPONIVEL')
			} else {
				if (has_projects) {
					if (hours_left >= resource_hours) {
						await this.saveResourceStatusActive(resource_id, 'DISPONIVEL')
					}

					else if (hours_left >= 1 && hours_left < resource_hours) {
						await this.saveResourceStatusActive(resource_id, 'PARCIALMENTE')
					}

					else if (hours_left <= 0) {
						await this.saveResourceStatusActive(resource_id, 'ALOCADO')
					}
				} else {
					await this.saveResourceStatusActive(resource_id, 'DISPONIVEL')
				}
			}

		} else {
			const statusExists = await this.statusResourceRepository.findByName(status)

			await this.resourceStatusRepository.findUpdateOrCreate({
				resource_id: resource_id,
				status_id: statusExists?.id ?? 1,
				substatus_id: null
			})
		}

	}

	private async saveResourceStatusActive(resource_id: number, substatus: string): Promise<ResourceStatus> {
		const substatusExists = await this.substatusRepository.findBySubstatus(substatus)
		if (!substatusExists) throw new SubstatusNotFoundException()

		return await this.resourceStatusRepository.findUpdateOrCreate({
			resource_id: resource_id,
			status_id: 1,
			substatus_id: substatusExists.id
		})
	}
}
