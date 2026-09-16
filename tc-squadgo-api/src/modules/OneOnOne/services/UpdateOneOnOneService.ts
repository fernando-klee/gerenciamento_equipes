import { inject, injectable } from 'tsyringe'
import { IOneOnOneRepository } from '../repositories/IOneOnOneRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'

interface IRequest {
    id: number
    description: string
}

@injectable()
export default class UpdateOneOnOneService {
    constructor(
        @inject('OneOnOneRepository')
        private oneOnOneRepository: IOneOnOneRepository
    ) {}

    async execute({ id, description }: IRequest): Promise<void> {
        const oneOnOne = await this.oneOnOneRepository.findById(id)
        
        if (!oneOnOne) {
            throw new ResourceNotFoundException()
        }

        await this.oneOnOneRepository.updateOneOnOne(id, { description })
    }
} 