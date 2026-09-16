import { Repository } from 'typeorm'
import ISkillsPendingRepository from '../../../repositories/ISkillsPendingRepository'
import SkillsPending from '../entities/SkillsPending'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class SkillsPendingRepository implements ISkillsPendingRepository {
	private ormRepository: Repository<SkillsPending>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(SkillsPending)
	}

	async save(skillsPending: SkillsPending): Promise<SkillsPending> {
		const skillCreated = this.ormRepository.create(skillsPending)

		return await this.ormRepository.save(skillCreated)
	}

	async deleteById(id: number): Promise<void> {
		await this.ormRepository.delete(id)
	}
}
