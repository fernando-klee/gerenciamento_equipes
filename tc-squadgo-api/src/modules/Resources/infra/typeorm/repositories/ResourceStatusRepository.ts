import { Repository } from 'typeorm'

import IResourceStatusRepository from '../../../repositories/IResourceStatusRepository'
import ResourceStatus from '../entities/ResourceStatus'
import SaveResourceStatusDTO from '../../../dtos/SaveResourceStatusDTO'
import FindOrCreateResourceStatusDTO from '../../../dtos/FindOrCreateResourceStatusDTO'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class ResourceStatusRepository implements IResourceStatusRepository {
	private ormRepository: Repository<ResourceStatus>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(ResourceStatus)
	}

	async findByResourceId(resource_id: number): Promise<ResourceStatus | null> {
		const data = this.ormRepository.createQueryBuilder('rs')
			.select([
				'rs.id',
				'resource.id',
				'status.id',
				'status.name',
				'substatus.id'
			])
			.leftJoin('rs.resource', 'resource')
			.leftJoin('rs.status', 'status')
			.leftJoin('rs.substatus', 'substatus')
			.where({ resource_id })
			.getOne()

		return await data
	}

	async listByResourceId(resource_id: number): Promise<ResourceStatus[]> {
		return await this.ormRepository.find({ where: { resource_id } })
	}

	async save(data: SaveResourceStatusDTO): Promise<ResourceStatus> {
		return await this.ormRepository.save(data)
	}

	async saveAll(data: SaveResourceStatusDTO[]): Promise<void> {
		await this.ormRepository.save(data)
	}

	async deleteByResourceId(resource_id: number): Promise<void> {
		await this.ormRepository.delete(resource_id)
	}

	async findUpdateOrCreate(data: FindOrCreateResourceStatusDTO): Promise<ResourceStatus> {
		const resourceStatusExists = await this.findByResourceId(data.resource_id)
		if (resourceStatusExists) {
			return await this.ormRepository.save({ id: resourceStatusExists.id, ...data })
		} else {
			return await this.save(data)
		}
	}

}
