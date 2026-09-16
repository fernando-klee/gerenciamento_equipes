import { inject, injectable } from 'tsyringe'
import RoleNotFoundException from '../../../shared/infra/exceptions/RoleNotFoundException'
import Role from '../infra/typeorm/entities/Role'
import IRolesRepository from '../repositories/IRolesRepository'

@injectable()
export default class FindRoleService {
	constructor(
		@inject('RolesRepository')
		private rolesRepository: IRolesRepository
	) { }

	async execute(role_id: number): Promise<Role> {
		const roleExists = await this.rolesRepository.findById(role_id)
		if (!roleExists) throw new RoleNotFoundException()
		return roleExists
	}
}
