import { inject, injectable } from 'tsyringe'
import IRoomsResourcesWeekdaysRepository from '../repositories/IRoomsResourcesWeekdaysRepository'
import NoResourceInRoomThisDayException from '../../../shared/infra/exceptions/NoResourceInRoomThisDayException'
import { ResourceRoomWeekDaysEntityDTO } from '../dtos/ResourceRoomWeekDaysEntityDTO'

interface IRequest {
  data: {
    resource_id: number;
    room_resource_weekday_id: number;
  }[];
}

@injectable()
export default class RemoveResourceRoomToDayOfWeek {
  constructor(
    @inject('RoomsResourcesWeekdaysRepository')
    private roomsResourcesWeekdaysRepository: IRoomsResourcesWeekdaysRepository,
  ) { }

  async execute({ data }: IRequest): Promise<void> {
    try {
      for (const item of data) {
				const { resource_id, room_resource_weekday_id } = item

        const resourceRoomWeekdays = await this.roomsResourcesWeekdaysRepository.findById(room_resource_weekday_id)

        if (!resourceRoomWeekdays || resourceRoomWeekdays.resource_id !== resource_id) {
          throw new NoResourceInRoomThisDayException()
        }

        await this.roomsResourcesWeekdaysRepository.deleteById(resource_id, room_resource_weekday_id)
      }
    } catch (error) {
      console.error('Error while removing resource room to day of week:', error)
      throw error
    }
  }
}
