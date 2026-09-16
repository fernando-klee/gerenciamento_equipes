import { Repository } from 'typeorm'
import ISkillsRepository from '../../../repositories/ISkillsRepository'
import Skill from '../entities/Skill'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class SkillsRepository implements ISkillsRepository {
	private ormRepository: Repository<Skill>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(Skill)
	}

	async save(skill: Skill): Promise<Skill> {
		const skillCreated = this.ormRepository.create(skill)

		return await this.ormRepository.save(skillCreated)
	}

	async list(): Promise<Skill[]> {
		return await this.ormRepository.find({order: { description: 'ASC'}})
	}

	async listByIds(ids: number[]): Promise<Skill[]> {
		return await this.ormRepository.findByIds(ids)
	}

	async findByDescription(description: string): Promise<Skill | null> {
		return await this.ormRepository.findOne({ where: { description } })
	}

	async findById(id: number): Promise<Skill | null> {
		return await this.ormRepository.findOne({ where: { id } })
	}

	async findByDescriptionAndType(description: string, type: string): Promise<Skill | null> {
		return await this.ormRepository.findOne({ where: { description, type } })
	}

	async deleteById(id: number): Promise<void> {
		await this.ormRepository.delete(id)
	}
}
