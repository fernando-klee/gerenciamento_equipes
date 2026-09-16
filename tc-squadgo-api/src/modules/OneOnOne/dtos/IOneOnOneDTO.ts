import { OneOnOneType } from '../infra/typeorm/entities/OneOnOne'

export interface IOneOnOneDTO {
    id?: number;
    description: string;
    type: OneOnOneType;
    leaderId: number;
    resourceId: number;
    createdAt?: Date;
    updatedAt?: Date;
}
