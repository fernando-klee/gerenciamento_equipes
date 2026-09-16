import { inject, injectable } from 'tsyringe'
import { OneOnOne } from '../infra/typeorm/entities/OneOnOne'
import { IOneOnOneRepository } from '../repositories/IOneOnOneRepository'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'

interface IRequest {
	resourceId: number;
}

@injectable()
export default class ListOneOnOneService {
	constructor(
		@inject('OneOnOneRepository')
		private oneOnOneRepository: IOneOnOneRepository,

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository
	) {}

	async execute({ resourceId }: IRequest): Promise<OneOnOne[]> {
		const resourceExists = await this.resourcesRepository.findById(resourceId)
		if (!resourceExists) throw new ResourceNotFoundException()

		const oneOnOnes = await this.oneOnOneRepository.findByResourceId(
			resourceId
		)

		if (oneOnOnes.length === 0) {
			throw new Error('No one-on-ones found for this resource.')
		}

		const leaderId = oneOnOnes[0].leaderId
		const LeaderReporter = await this.resourcesRepository.findById(leaderId)

		const fullName = LeaderReporter?.name?.trim() || 'Unknown Leader'
		const nameParts = fullName.split(' ')

		let leaderName: string
		if (nameParts.length === 1) {
			leaderName = nameParts[0]
		} else {
			leaderName = `${nameParts[0]} ${nameParts[nameParts.length - 1]}`
		}

		const enrichedOneOnOnes = oneOnOnes.map((ooo) => ({
			...ooo,
			leaderName,
		}))

		return enrichedOneOnOnes
	}
}
