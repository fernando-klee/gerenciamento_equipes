import { inject, injectable } from 'tsyringe'
import Role from '../infra/typeorm/entities/Role'
import IRolesRepository from '../repositories/IRolesRepository'

@injectable()
export default class ListRolesService {
	constructor(
		@inject('RolesRepository')
		private rolesRepository: IRolesRepository
	) { }

	async execute(): Promise<Role[]> {
		return await this.rolesRepository.list()
	}
}
