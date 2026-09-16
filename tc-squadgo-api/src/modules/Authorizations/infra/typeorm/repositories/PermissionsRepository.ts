import { Repository } from 'typeorm'
import IPermissionsRepository from '../../../repositories/IPermissionsRepository'
import Permission from '../entities/Permission'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class PermissionsRepository implements IPermissionsRepository {
	private ormRepository: Repository<Permission>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(Permission)
	}

	async save(permission: Permission): Promise<Permission> {
		const newPermission = this.ormRepository.create(permission)

		return await this.ormRepository.save(newPermission)
	}

	async findBySlug(slug: string): Promise<Permission | null> {
		return await this.ormRepository.findOne({ where: { slug } })
	}

	async list(): Promise<Permission[]> {
		return await this.ormRepository.find()
	}

	async listByIds(permissions_ids: number[]): Promise<Permission[]> {
		return await this.ormRepository.findByIds(permissions_ids)
	}
}
