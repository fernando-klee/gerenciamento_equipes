import { inject, injectable } from 'tsyringe'

import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import RoomNotFoundException from '../../../shared/infra/exceptions/RoomNotFoundException'
import IRoomsRepository from '../../Rooms/repositories/IRoomsRepository'
import RoomOrResourceNotFoundException from '../../../shared/infra/exceptions/RoomOrResourceNotFoundException'
import IRoomsResourcesWeekdaysRepository from '../repositories/IRoomsResourcesWeekdaysRepository'
import IDraftsRoomsResourcesWeekdaysRepository from '../repositories/IDraftsRoomsResourcesWeekdaysRepository'

//não sei se isso aqui tá funcionando, preciso testar ainda

interface IRequest {
	resource_id: number

    new_week_day: number
    new_room_id: number
    new_month: number
}

@injectable()
export default class UpdateDraftRoomsResourcesService {
	constructor(
		@inject('RoomsRepository')
		private roomsRepository: IRoomsRepository,

		@inject('DraftsRoomsResourcesWeekdaysRepository')
		private draftsRoomsResourcesWeekdaysRepository: IDraftsRoomsResourcesWeekdaysRepository,
	) { }

	async execute(data: IRequest) {
		const { resource_id, new_week_day, new_room_id, new_month } = data

		const newRoomExists = await this.roomsRepository.findById(new_room_id)
		if (!newRoomExists) throw new RoomNotFoundException

        const userResourceExists = await this.draftsRoomsResourcesWeekdaysRepository.findDraftByResourceId(resource_id)

		if (userResourceExists) {
			userResourceExists.room_id = new_room_id
            userResourceExists.week_day = new_week_day
            userResourceExists.month = new_month
			await this.draftsRoomsResourcesWeekdaysRepository.update(userResourceExists)
		} else {
			throw new RoomOrResourceNotFoundException
		}

	}

}
