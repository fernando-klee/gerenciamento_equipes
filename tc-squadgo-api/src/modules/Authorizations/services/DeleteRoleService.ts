import { inject, injectable } from 'tsyringe'
import IRolesRepository from '../repositories/IRolesRepository'
import RoleNotFoundException from '../../../shared/infra/exceptions/RoleNotFoundException'

@injectable()
export default class DeleteRoleService {
	constructor(
		@inject('RolesRepository')
		private rolesRepository: IRolesRepository
	) { }

	async execute(role_id: number): Promise<void> {
		const roleExistsById = await this.rolesRepository.findById(role_id)
		if (!roleExistsById) throw new RoleNotFoundException()

		await this.rolesRepository.deleteById(role_id)
	}
}
