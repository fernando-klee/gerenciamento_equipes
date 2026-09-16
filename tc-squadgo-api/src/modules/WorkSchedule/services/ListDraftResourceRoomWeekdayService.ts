import { inject, injectable } from 'tsyringe'
import RoomsResourcesWeekdays from '../infra/typeorm/entities/RoomsResourcesWeekdays'
import IDraftsRoomsResourcesWeekdaysRepository from '../repositories/IDraftsRoomsResourcesWeekdaysRepository'

@injectable()
export default class ListDraftResourceRoomWeekdayService {
  constructor(
    @inject('DraftsRoomsResourcesWeekdaysRepository')
    private draftsRoomsResourcesWeekdaysRepository: IDraftsRoomsResourcesWeekdaysRepository,
  ) {}

  async execute(): Promise<RoomsResourcesWeekdays[]> {
    const roomsResources = await this.draftsRoomsResourcesWeekdaysRepository.list()

    return roomsResources
  }
}
