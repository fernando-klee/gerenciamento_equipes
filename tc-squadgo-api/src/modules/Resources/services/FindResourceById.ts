import { instanceToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import IGetResourceAvailableHours from '../providers/interfaces/IGetResourceAvailableHours'
import IResourcesRepository from '../repositories/IResourcesRepository'

@injectable()
export default class FindResourceById {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('GetResourceAvailableHours')
		private getResourceAvailableHours: IGetResourceAvailableHours
	) { }

	async execute(resource_id: number): Promise<any> {
		const resourceExists = await this.resourcesRepository.findById(resource_id)
		if (!resourceExists) throw new ResourceNotFoundException()

		const { available_hours } = await this.getResourceAvailableHours.execute(resource_id)

		const resourceFormatted = instanceToInstance(resourceExists)
		return instanceToInstance({ ...resourceFormatted, hours_left: available_hours })
	}
}
