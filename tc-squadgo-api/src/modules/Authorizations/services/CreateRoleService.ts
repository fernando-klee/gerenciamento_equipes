import { inject, injectable } from 'tsyringe'
import Role from '../infra/typeorm/entities/Role'
import IRolesRepository from '../repositories/IRolesRepository'
import IPermissionsRepository from '../repositories/IPermissionsRepository'
import RoleAlreadyExistsException from '../../../shared/infra/exceptions/RoleAlreadyExistsException'

@injectable()
export default class CreateRoleService {
	constructor(
		@inject('RolesRepository')
		private rolesRepository: IRolesRepository,

		@inject('PermissionsRepository')
		private permissionsRepository: IPermissionsRepository
	) { }

	async execute(name: string, permissions_ids: number[]): Promise<Role> {
		const roleExists = await this.rolesRepository.findByName(name)
		if (roleExists) throw new RoleAlreadyExistsException()

		const permissionsFounded = await this.permissionsRepository.listByIds(permissions_ids)

		const role = new Role()
		Object.assign(role, {
			name,
			permissions: permissionsFounded
		})

		return await this.rolesRepository.save(role)
	}
}
