import { instanceToInstance } from 'class-transformer'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import { inject, injectable } from 'tsyringe'
import IResourcesRepository from '../repositories/IResourcesRepository'

@injectable()
export default class ListResourceServiceOutputEstimate {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository
	) {}

	async execute(): Promise<any[]> {
		const resources = await this.resourcesRepository.list()

		const resourceFormatted = instanceToInstance(resources)

		if (resourceFormatted.length === 0) {
			throw new ResourceNotFoundException()
		}

		return resourceFormatted.map((resource) => ({
			name: resource.name,
			photo_url: resource.photo_url,
			output_estimate: resource.output_estimate,
		}))
	}
}
