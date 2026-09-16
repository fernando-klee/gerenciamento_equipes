import { inject, injectable } from 'tsyringe'
import Resource from '../infra/typeorm/entities/Resource'
import IResourcesRepository from '../repositories/IResourcesRepository'

@injectable()
export default class ListResponsiblesService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository
	) { }

	async execute(): Promise<Resource[]> {
		const responsibles = await this.resourcesRepository.listResponsibles()

		return responsibles
	}
}
