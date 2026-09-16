import { OneOnOne } from '../infra/typeorm/entities/OneOnOne'
import { IOneOnOneDTO } from '../dtos/IOneOnOneDTO'

export interface IOneOnOneRepository {
    findById(id: number): Promise<OneOnOne | null>;
    findAll(): Promise<OneOnOne[]>;
    createOneOnOne(data: IOneOnOneDTO): Promise<OneOnOne>;
    updateOneOnOne(id: number, data: Partial<IOneOnOneDTO>): Promise<OneOnOne | null>;
    deleteOneOnOne(id: number): Promise<void>;
    findByLeaderId(leaderId: number): Promise<OneOnOne[]>;
    findByResourceId(resourceId: number): Promise<OneOnOne[]>;
}
