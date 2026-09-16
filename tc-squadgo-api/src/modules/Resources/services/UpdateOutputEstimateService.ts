import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import { inject, injectable } from 'tsyringe'

import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import Resource from '../infra/typeorm/entities/Resource'

interface IRequest {
	resource_id: number
    new_output_estimate: Date
    new_departure_forecast: Date
}

@injectable()
export default class UpdateOutputEstimateService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

	) { }

	async execute(data: IRequest) {
        const { resource_id, new_output_estimate, new_departure_forecast } = data
    
        let resourceToUpdate = await this.resourcesRepository.findById(resource_id)
        if (!resourceToUpdate) throw new ResourceNotFoundException

        resourceToUpdate = {
            ...resourceToUpdate,
            output_estimate: new_output_estimate,
            departure_forecast: new_departure_forecast
        } as Resource

        if (resourceToUpdate) {
            await this.resourcesRepository.save(resourceToUpdate)
        } else {
            throw new ResourceNotFoundException
        }
    }

}
