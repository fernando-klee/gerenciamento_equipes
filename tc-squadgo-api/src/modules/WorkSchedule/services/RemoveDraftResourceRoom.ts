import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import IRoomsRepository from '../../Rooms/repositories/IRoomsRepository'
import RoomNotFoundException from '../../../shared/infra/exceptions/RoomNotFoundException'
import ResourceIsNotInThatRoomInThatMonthInThatDayException from '../../../shared/infra/exceptions/ResourceIsNotInThatRoomInThatMonthInThatDayException'
import { inject, injectable } from 'tsyringe'

import IRoomsResourcesWeekdaysRepository from '../repositories/IRoomsResourcesWeekdaysRepository'
import IDraftsRoomsResourcesWeekdaysRepository from '../repositories/IDraftsRoomsResourcesWeekdaysRepository'

interface IRequest {
	resource_id: number
	room_id: number
	month: number
    week_day: number
}

@injectable()
export default class RemoveDraftResourceRoom {
	constructor(
		@inject('DraftsRoomsResourcesWeekdaysRepository')
		private draftsRoomsResourcesWeekdaysRepository: IDraftsRoomsResourcesWeekdaysRepository,
		
        @inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('RoomsRepository')
		private roomsRepository: IRoomsRepository
	) { }

	async execute(data: IRequest) {
		const { resource_id, room_id, month, week_day } = data

		const resourceExists = await this.resourcesRepository.findById(resource_id)
		if (!resourceExists) throw new ResourceNotFoundException

		const roomExists = await this.roomsRepository.findById(room_id)
		if (!roomExists) throw new RoomNotFoundException

		const userAlreadyInRoom = await this.draftsRoomsResourcesWeekdaysRepository.findByDraftResourceAndRoomIdAndMonthAndWeekday(resource_id, room_id, month, week_day)
		if (!userAlreadyInRoom) throw new ResourceIsNotInThatRoomInThatMonthInThatDayException

		if (userAlreadyInRoom) await this.draftsRoomsResourcesWeekdaysRepository.deleteById(userAlreadyInRoom.id)
	}

}
