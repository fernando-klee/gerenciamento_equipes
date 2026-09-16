import { Repository } from 'typeorm'
import ITypesRepository from 'modules/Resources/repositories/ITypesRepository'
import Type from '../entities/Type'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class TypesRepository implements ITypesRepository {
	private ormRepository: Repository<Type>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(Type)
	}

	async list(): Promise<Type[]> {
		return await this.ormRepository.find()
	}

	async findById(type_id: number): Promise<Type | null> {
		return await this.ormRepository.findOne({ where: { id: type_id } })
	}

	async listByIds(types_ids: number[]): Promise<Type[]> {
		return await this.ormRepository.findByIds(types_ids)
	}

}
