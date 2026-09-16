import { Repository } from 'typeorm'
import { OneOnOne } from '../entities/OneOnOne'
import { IOneOnOneDTO } from '../../../dtos/IOneOnOneDTO'
import { IOneOnOneRepository } from '../../../repositories/IOneOnOneRepository'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export class OneOnOneRepository implements IOneOnOneRepository {
    private ormRepository: Repository<OneOnOne>

    constructor() {
        this.ormRepository = AppDataSource.getRepository(OneOnOne)
    }

    public async findById(id: number): Promise<OneOnOne | null> {
        return this.ormRepository.findOneBy({ id })
    }

    public async findAll(): Promise<OneOnOne[]> {
        return this.ormRepository.find()
    }

    public async createOneOnOne(data: IOneOnOneDTO): Promise<OneOnOne> {
        const oneOnOne = this.ormRepository.create(data)
        return this.ormRepository.save(oneOnOne)
    }

    public async updateOneOnOne(id: number, data: Partial<IOneOnOneDTO>): Promise<OneOnOne | null> {
        await this.ormRepository.update(id, data)
        return this.findById(id)
    }

    public async deleteOneOnOne(id: number): Promise<void> {
        await this.ormRepository.delete(id)
    }

    public async findByLeaderId(leaderId: number): Promise<OneOnOne[]> {
        return this.ormRepository.find({ where: { leaderId } })
    }

    public async findByResourceId(resourceId: number): Promise<OneOnOne[]> {
        return this.ormRepository.find({ where: { resourceId } })
    }
}
