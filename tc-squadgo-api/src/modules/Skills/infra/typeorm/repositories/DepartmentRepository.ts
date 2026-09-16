import { Repository } from 'typeorm'
import SkillsSetores from '../entities/SkillsDepartments'
import ISetoresRepository from '../../../repositories/IDepartmentRepository'
import Setores from '../entities/Department'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class DepartmentRepository implements ISetoresRepository {
	private ormRepository: Repository<Setores>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(Setores)
	}

	async save(setor: Setores): Promise<Setores> {
		const setorCreated = this.ormRepository.create(setor)

		return await this.ormRepository.save(setorCreated)
	}

	async list(): Promise<Setores[]> {
		return await this.ormRepository.find()
	}

	async deleteById(id: number): Promise<void> {
		await this.ormRepository.delete(id)
	}

    async findById(id: number): Promise<Setores | null> {
		return await this.ormRepository.findOne({ where: { id } })
	}
}