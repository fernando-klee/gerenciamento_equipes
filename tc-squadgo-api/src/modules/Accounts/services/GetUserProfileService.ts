import { inject, injectable } from 'tsyringe'
import UserNotFoundException from '../../../shared/infra/exceptions/UserNotFoundException'
import IGetResourceProfileDTO from '../dtos/IGetResourceProfileDTO'
import IResourcesRepository from '../../../modules/Resources/repositories/IResourcesRepository'
import ResourceMap from '../mapper/ResourceMap'

@injectable()
export default class GetUserProfileService {
	constructor(
		@inject('ResourcesRepository')
		private resourceRepository: IResourcesRepository
	) { }

	async execute(user_id: string): Promise<IGetResourceProfileDTO> {

		const userExists = await this.resourceRepository.findByRegistry(user_id)

		if (!userExists) throw new UserNotFoundException()

		const userPermissions = await this.resourceRepository.listPermissionsByResourceId(userExists.id)
		const permissionsArray = userPermissions.map(p => p.slug)

		return ResourceMap.resourceProfile(userExists, permissionsArray)
	}
}
