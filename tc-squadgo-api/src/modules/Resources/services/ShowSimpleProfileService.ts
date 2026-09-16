import { instanceToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import Resource from '../infra/typeorm/entities/Resource'
import IResourcesRepository from '../repositories/IResourcesRepository'

@injectable()
export default class ShowSimpleProfileService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository
	) { }

	async execute(resource_id: number): Promise<Resource> {
		const resourceExists = await this.resourcesRepository.showSimpleProfile(resource_id)
		if (!resourceExists) throw new ResourceNotFoundException()

		return instanceToInstance(resourceExists)
	}
}
