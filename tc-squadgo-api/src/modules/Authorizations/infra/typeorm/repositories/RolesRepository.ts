import { Repository } from 'typeorm'
import IRolesRepository from '../../../repositories/IRolesRepository'
import Role from '../entities/Role'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class RolesRepository implements IRolesRepository {
	private ormRepository: Repository<Role>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(Role)
	}

	async save(role: Role): Promise<Role> {
		const newRole = this.ormRepository.create(role)

		return await this.ormRepository.save(newRole)
	}

	async list(): Promise<Role[]> {
		return await this.ormRepository.find({ relations: ['permissions'] })
	}

	async findByName(name: string): Promise<Role | null> {
		return await this.ormRepository.findOne({ where: { name } })
	}

	async findById(id: number): Promise<Role | null> {
		return await this.ormRepository.findOne({ where: { id }, relations: ['permissions'] })
	}

	async findByResourceId(id: number): Promise<Role[] | null> {
		return await this.ormRepository.find({ where: { id }, relations: ['permissions'] })
	}

	async deleteById(id: number): Promise<void> {
		await this.ormRepository.delete(id)
	}

	async listByIds(roles_ids: number[]): Promise<Role[]> {
		return await this.ormRepository.findByIds(roles_ids)
	}
}

