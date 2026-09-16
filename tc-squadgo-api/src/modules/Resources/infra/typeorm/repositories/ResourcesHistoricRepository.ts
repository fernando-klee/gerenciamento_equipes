import { Repository } from 'typeorm'

import IFilterResourceHistoricDTO from '../../../dtos/IFilterResourceHistoricDTO'
import ICreateResourceHistoricDTO from '../../../dtos/ICreateResourceHistoricDTO'
import IResourcesHistoricRepository from '../../../repositories/IResourcesHistoricRepository'
import ResourceHistoric from '../entities/ResourceHistoric'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class ResourcesHistoricRepository implements IResourcesHistoricRepository {
	private ormRepository: Repository<ResourceHistoric>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(ResourceHistoric)
	}

	async save(data: ICreateResourceHistoricDTO): Promise<ResourceHistoric> {
		const historicCreated = this.ormRepository.create(data)

		return await this.ormRepository.save(historicCreated)
	}

	async list(data: IFilterResourceHistoricDTO): Promise<any> {
		const { resource_id, currentPage, qtdPerPage } = data

		const dataFilter = this.ormRepository.createQueryBuilder('h')
			.select([
				'h.id',
				'h.description',
				'h.type',
				'h.created_at'
			])
			.leftJoin('h.resource', 'resource')
			.where('h.resource_id = :resource_id', { resource_id })
			.orderBy('h.id', 'DESC')

		const totalHistoric = await dataFilter.getCount()
		const historics = await dataFilter.take(qtdPerPage).skip(currentPage).getMany()

		return { totalHistoric, historics }
	}

}
