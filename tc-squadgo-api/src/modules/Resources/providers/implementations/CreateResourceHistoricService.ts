import { inject, injectable } from 'tsyringe'

import ResourceHistoric from '../../infra/typeorm/entities/ResourceHistoric'
import IResourcesHistoricRepository from '../../repositories/IResourcesHistoricRepository'
import ICreateResourceHistoricDTO from '../../dtos/ICreateResourceHistoricDTO'

@injectable()
export default class CreateResourceHistoricService {
	constructor(
		@inject('ResourcesHistoricRepository')
		private resourcesHistoricRepository: IResourcesHistoricRepository
	) { }

	async execute(data: ICreateResourceHistoricDTO): Promise<ResourceHistoric> {
		return await this.resourcesHistoricRepository.save(data)
	}
}
