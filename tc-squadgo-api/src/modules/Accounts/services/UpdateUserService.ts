import { inject, injectable } from 'tsyringe'

import { instanceToInstance } from 'class-transformer'

import UserAlreadyExistsException from '../../../shared/infra/exceptions/UserAlreadyExistsException'
import Resource from '../../Resources/infra/typeorm/entities/Resource'
import IRolesRepository from '../../Authorizations/repositories/IRolesRepository'
import UserNotFoundException from '../../../shared/infra/exceptions/UserNotFoundException'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'

interface IRequest {
	user_id: number
	name: string
	email: string,
	roles_ids: number[]
}

@injectable()
export default class UpdateUserService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('RolesRepository')
		private rolesRepository: IRolesRepository
	) { }

	async execute(data: IRequest): Promise<Resource> {
		const { user_id, name, email, roles_ids } = data

		const userExistsById = await this.resourcesRepository.findById(Number(user_id))
		if (!userExistsById) throw new UserNotFoundException()

		const userExistsByEmail = await this.resourcesRepository.findByEmail(email)
		if (userExistsByEmail && userExistsByEmail.id !== Number(user_id)) throw new UserAlreadyExistsException()

		const rolesExists = await this.rolesRepository.listByIds(roles_ids)

		Object.assign(userExistsById, {
			name,
			email,
			roles: rolesExists
		})

		const userUpdate = await this.resourcesRepository.save(userExistsById)

		return instanceToInstance(userUpdate)
	}
}
