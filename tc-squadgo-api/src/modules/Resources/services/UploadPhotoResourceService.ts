import { instanceToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import IStorageProvider from '../../../shared/providers/storageProvider/interfaces/IStorageProvider'
import Resource from '../infra/typeorm/entities/Resource'
import IResourcesRepository from '../repositories/IResourcesRepository'

interface IRequest {
	resource_id: number
	filename: string
}

@injectable()
export default class UploadPhotoResourceService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('StorageProvider')
		private storageProvider: IStorageProvider
	) { }

	async execute(data: IRequest): Promise<Resource> {
		const { resource_id, filename } = data
		const resourceExists = await this.resourcesRepository.findById(resource_id)
		if (!resourceExists) throw new ResourceNotFoundException()

		if (resourceExists.photo_url) {
			await this.storageProvider.deleteFile(resourceExists.photo_url, 'resources_photos')
		}

		resourceExists.photo_url = filename
		await this.storageProvider.saveFile(filename, 'resources_photos')

		const resourceUpdated = await this.resourcesRepository.save(resourceExists)

		return instanceToInstance(resourceUpdated)
	}
}
