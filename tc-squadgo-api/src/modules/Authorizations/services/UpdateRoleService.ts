import SlugAlreadyExistsException from '../../../shared/infra/exceptions/SlugAlreadyExistsException'
import { inject, injectable } from 'tsyringe'
import Role from '../infra/typeorm/entities/Role'
import IRolesRepository from '../repositories/IRolesRepository'
import IPermissionsRepository from '../repositories/IPermissionsRepository'
import RoleNotFoundException from '../../../shared/infra/exceptions/RoleNotFoundException'

interface IRequest {
	role_id: number
	name: string
	permissions_ids: number[]
}

@injectable()
export default class UpdateRoleService {
	constructor(
		@inject('RolesRepository')
		private rolesRepository: IRolesRepository,

		@inject('PermissionsRepository')
		private permissionsRepository: IPermissionsRepository
	) { }

	async execute(data: IRequest): Promise<Role> {
		const { role_id, name, permissions_ids } = data

		const roleExistsById = await this.rolesRepository.findById(role_id)
		if (!roleExistsById) throw new RoleNotFoundException()

		const roleExists = await this.rolesRepository.findByName(name)

		if (roleExists && roleExists.id !== role_id) throw new SlugAlreadyExistsException

		const permissionsFounded = await this.permissionsRepository.listByIds(permissions_ids)

		Object.assign(roleExistsById, {
			name,
			permissions: permissionsFounded
		})

		return await this.rolesRepository.save(roleExistsById)
	}
}
