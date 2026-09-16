import { inject, injectable } from 'tsyringe'
import ResourceProjectsHistoric from '../../../Resources/infra/typeorm/entities/ResourceProjectsHistoric'
import IResourceProjectsHistoricRepository from '../../../Resources/repositories/IResourceProjectsHistoricRepository'
import ICreateResourceProjectHistoricService from '../interfaces/ICreateResourceProjectHistoricService'

@injectable()
export default class CreateResourceProjectHistoricService implements ICreateResourceProjectHistoricService {
	constructor(
		@inject('ResourceProjectsHistoricRepository')
		private resourceProjectsHistoricRepository: IResourceProjectsHistoricRepository
	) { }

	async execute(resource_id: number, project_id: number): Promise<ResourceProjectsHistoric> {
		const resourceProjectHistoricExists = await this.resourceProjectsHistoricRepository.findByResourceAndProject(resource_id, project_id)

		if (!resourceProjectHistoricExists) {
			const resourceProjectHistoric = await this.resourceProjectsHistoricRepository.updateOrCreate(resource_id, project_id)

			return resourceProjectHistoric
		}

		return resourceProjectHistoricExists

	}
}
