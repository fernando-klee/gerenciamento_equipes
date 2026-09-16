import IClassificationsRepository from '../../../repositories/IClassificationsRepository'
import Classification from '../entities/Classification'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'
import { Repository } from 'typeorm'

export default class ClassificationsRepository implements IClassificationsRepository {
	private ormRepository: Repository<Classification>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(Classification)
	}

	async list(): Promise<Classification[]> {
		return await this.ormRepository.find()
	}

	async findById(classification_id: number): Promise<Classification | null> {
		return await this.ormRepository.findOne({ where: { id: classification_id } })
	}

	async findByDescription(description: string): Promise<Classification | null> {
		return await this.ormRepository.findOne({ where: { description } })
	}
}
