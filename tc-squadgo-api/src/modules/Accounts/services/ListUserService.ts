import { inject, injectable } from 'tsyringe'

import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import Resource from '../../Resources/infra/typeorm/entities/Resource'

@injectable()
export default class ListUserService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository
	) { }

	async execute(): Promise<Resource[]> {
		const resources = await this.resourcesRepository.listWithRoles()

		return resources
	}
}
