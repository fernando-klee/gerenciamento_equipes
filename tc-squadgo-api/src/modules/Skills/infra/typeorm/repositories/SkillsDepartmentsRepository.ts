import { Repository } from 'typeorm'
import SkillsDepartments from '../entities/SkillsDepartments'
import ISkillsSetoresRepository from '../../../../Skills/repositories/ISkillsDepartmentsRepository'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class SkillsDepartmentsRepository implements ISkillsSetoresRepository {
	private ormRepository: Repository<SkillsDepartments>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(SkillsDepartments)
	}

	async save(skillSetor: SkillsDepartments): Promise<SkillsDepartments> {
		const skillSetorCreated = this.ormRepository.create(skillSetor)

		return await this.ormRepository.save(skillSetorCreated)
	}

	async list(): Promise<SkillsDepartments[]> {
		return await this.ormRepository.find()
	}

	async deleteById(id: number): Promise<void> {
		await this.ormRepository.delete(id)
	}

    async findBySkillAndSetor(skill_id: number, setor_id: number): Promise<SkillsDepartments | null> {
		return await this.ormRepository.findOne({ where: { skill_id, setor_id } })
	}

	async findBySkillId(skill_id: number): Promise<SkillsDepartments | null> {
		return await this.ormRepository.findOne({ where: { skill_id } })
	}

    async findById(id: number): Promise<SkillsDepartments | null> {
		return await this.ormRepository.findOne({ where: { id } })
	}
}
