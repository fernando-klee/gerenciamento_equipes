import Permission from '../../../modules/Authorizations/infra/typeorm/entities/Permission'
import { inject, injectable } from 'tsyringe'
import IResourcesRepository from '../../../modules/Resources/repositories/IResourcesRepository'
import UserNotFoundException from '../../../shared/infra/exceptions/UserNotFoundException'

@injectable()
export default class ListUserPermissionsService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository
	) { }

	async execute(user_id: string): Promise<Permission[]> {
		const userExists = await this.resourcesRepository.findByRegistry(user_id)
		if (!userExists) throw new UserNotFoundException()

		return await this.resourcesRepository.listPermissionsByResourceId(userExists.id)
	}
}
