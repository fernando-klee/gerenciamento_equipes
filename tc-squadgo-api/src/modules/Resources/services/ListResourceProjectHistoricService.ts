import { instanceToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'
import ResourceProjectsHistoric from '../infra/typeorm/entities/ResourceProjectsHistoric'
import IResourceProjectsHistoricRepository from '../repositories/IResourceProjectsHistoricRepository'

@injectable()
export default class ListResourceProjectHistoricService {
	constructor(
		@inject('ResourceProjectsHistoricRepository')
		private resourceProjectHistoric: IResourceProjectsHistoricRepository
	) { }

	async execute(resource_id: number): Promise<ResourceProjectsHistoric[]> {
		const resourceProjectHistoric = await this.resourceProjectHistoric.listByResourceId(resource_id)

		return instanceToInstance(resourceProjectHistoric)
	}
}
