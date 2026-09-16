import { Repository } from 'typeorm'

import IResourceProjectsHistoricRepository from '../../../../../modules/Resources/repositories/IResourceProjectsHistoricRepository'
import ResourceProjectsHistoric from '../entities/ResourceProjectsHistoric'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class ResourceProjectsHistoricRepository implements IResourceProjectsHistoricRepository {
	private ormRepository: Repository<ResourceProjectsHistoric>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(ResourceProjectsHistoric)
	}

	async updateOrCreate(resource_id: number, project_id: number): Promise<ResourceProjectsHistoric> {
		const resourceProjectHistoric = this.ormRepository.create({ resource_id, project_id })

		return await this.ormRepository.save(resourceProjectHistoric)
	}

	async findByResourceAndProject(resource_id: number, project_id: number): Promise<ResourceProjectsHistoric | null> {
		return await this.ormRepository.findOne({ where: { resource_id, project_id } })
	}

	async listByResourceId(resource_id: number): Promise<ResourceProjectsHistoric[]> {
		const data = this.ormRepository.createQueryBuilder('rph')
			.select([
				'rph.id',
				'rph.created_at',
				'project.id',
				'project.name',
				'project.status',
				'project.start_estimate',
				'project.conclusion_date',
				'project.end_estimate',
				'resources.id',
				'resources.name',
				'resources.photo_url',
				'customer.id',
				'customer.name',
				'customer.image_url',
				'responsible.id',
				'responsible.name',
				'responsible.photo_url',
			])
			.leftJoin('rph.project', 'project')
			.leftJoin('project.customer', 'customer')
			.leftJoin('project.responsible', 'responsible')
			.leftJoin('project.resources', 'resources')
			.where({ resource_id })
			.getMany()

		return await data
	}
}
