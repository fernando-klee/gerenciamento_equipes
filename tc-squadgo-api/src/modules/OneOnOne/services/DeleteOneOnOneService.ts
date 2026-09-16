import { inject, injectable } from 'tsyringe'
import { IOneOnOneRepository } from '../repositories/IOneOnOneRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'

interface IRequest {
    id: number
}

@injectable()
export default class DeleteOneOnOneService {
    constructor(
        @inject('OneOnOneRepository')
        private oneOnOneRepository: IOneOnOneRepository
    ) {}

    async execute({ id }: IRequest): Promise<void> {
        const oneOnOne = await this.oneOnOneRepository.findById(id)
        
        if (!oneOnOne) {
            throw new ResourceNotFoundException()
        }

        await this.oneOnOneRepository.deleteOneOnOne(id)
    }
} 