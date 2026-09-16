import { Repository } from 'typeorm'
import IResourcesClassificationsRepository from '../../../repositories/IResourcesClassificationsRepository'
import ResourcesClassifications from '../entities/ResourcesClassifications'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class ResourcesClassificationsRepository implements IResourcesClassificationsRepository {
	private ormRepository: Repository<ResourcesClassifications>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(ResourcesClassifications)
	}

	async findCreateOrUpdate(resource_id: number, classification_id: number): Promise<ResourcesClassifications> {
		const resourceClassificationExists = await this.ormRepository.findOne({ where: { resource_id } })
		if (!resourceClassificationExists) {
			const resourcesClassificationExists = this.ormRepository.create({ resource_id, classification_id })
			return await this.ormRepository.save(resourcesClassificationExists)
		}
		return await this.ormRepository.save({ ...resourceClassificationExists, classification_id })
	}

}
