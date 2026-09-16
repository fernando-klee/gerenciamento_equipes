import { inject, injectable } from 'tsyringe'
import Rooms from '../infra/typeorm/entities/Rooms'
import IRoomsRepository from '../repositories/IRoomsRepository'

@injectable()
export default class ListRoomsService {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: IRoomsRepository
  ) {}

  async execute(): Promise<Rooms[]> {
    const rooms = await this.roomsRepository.listWithProps()

    return rooms
  }
}
