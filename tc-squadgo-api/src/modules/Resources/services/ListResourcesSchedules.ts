import { inject, injectable } from 'tsyringe'
import ISkillsRepository from '../../Skills/repositories/ISkillsRepository'
import IResourcesRepository from '../repositories/IResourcesRepository'
import IResourcesSkillsRepository from '../repositories/IResourcesSkillsRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import IRoomsResourcesWeekdaysRepository from '../../WorkSchedule/repositories/IRoomsResourcesWeekdaysRepository'
import RoomNotFoundException from 'shared/infra/exceptions/RoomNotFoundException'
// import IWeekdaysRepository from '../../WorkSchedule/repositories/IWeekdaysRepository'

@injectable()
export default class ListResourcesSchedules {
  constructor(
    @inject('ResourcesRepository')
    private resourcesRepository: IResourcesRepository,

    @inject('RoomsResourcesWeekdaysRepository')
    private roomsResourcesWeekdaysRepository: IRoomsResourcesWeekdaysRepository,

    // @inject('WeekdaysRepository')
    // private weekdaysRepository: IWeekdaysRepository,
  ) {}

//   Promise<any[]>

  async execute(resource_id: number) {
//     const resourceExists = await this.resourcesRepository.findById(resource_id)
//     if (!resourceExists) throw new ResourceNotFoundException()

//     const weekdays = await this.weekdaysRepository.list()

//     const existingResourcesSchedule = await this.roomsResourcesWeekdaysRepository.findByResourceId(resource_id)

//     return weekdays.map((weekday) => {
//       const schedule = existingResourcesSchedule?.find((s) => s.weekday.day === weekday.day)
//       const room = schedule ? schedule.roomResource.rooms.name : ''
//       return {
//         weekday: weekday.day,
//         room: room,
//       }
//     })
//   }
}
}