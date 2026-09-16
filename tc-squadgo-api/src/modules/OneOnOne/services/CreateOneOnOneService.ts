import { inject, injectable } from 'tsyringe'
import { OneOnOne, OneOnOneType } from '../infra/typeorm/entities/OneOnOne'
import { IOneOnOneRepository } from '../repositories/IOneOnOneRepository'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'

interface ICreateOneOnOne {
    description: string;
    type: OneOnOneType;
    leaderId: number;
    resourceId: number;
}

@injectable()
export default class CreateOneOnOneService {
    constructor(
        @inject('OneOnOneRepository')
        private oneOnOneRepository: IOneOnOneRepository,

        @inject('ResourcesRepository')
        private resourcesRepository: IResourcesRepository,

    ) {}

    async execute(data: ICreateOneOnOne): Promise<OneOnOne> {
        const { description, type, leaderId, resourceId } = data

        const leaderExists = await this.resourcesRepository.findById(leaderId)
        if (!leaderExists) throw new ResourceNotFoundException()

        const resourceExists = await this.resourcesRepository.findById(resourceId)
        if (!resourceExists) throw new ResourceNotFoundException()

        const oneOnOne = await this.oneOnOneRepository.createOneOnOne({
            description,
            type,
            leaderId,
            resourceId
        })

        return oneOnOne
    }
} 