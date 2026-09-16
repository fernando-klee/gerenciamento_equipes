import { inject, injectable } from 'tsyringe'

import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import RoomNotFoundException from '../../../shared/infra/exceptions/RoomNotFoundException'
import IRoomsRepository from '../../Rooms/repositories/IRoomsRepository'
import RoomOrResourceNotFoundException from '../../../shared/infra/exceptions/RoomOrResourceNotFoundException'
import IRoomsResourcesWeekdaysRepository from '../repositories/IRoomsResourcesWeekdaysRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import WeekdayDoesNotExistException from '../../../shared/infra/exceptions/WeekdayDoesNotExistException'
import ResourceInSeveralRoomsInSameDayException from '../../../shared/infra/exceptions/ResourceInSeveralRoomsInSameDay'
import RoomFullException from '../../../shared/infra/exceptions/RoomFullException'

interface IRequest {
	resource_id: number;
	week_day: number;
	room_id: number;
	month: number;
	new_room_id: number;
	new_week_day: number;
}

@injectable()
export default class UpdateRoomsResourcesService {
	constructor(
		@inject('RoomsRepository')
		private roomsRepository: IRoomsRepository,

		@inject('RoomsResourcesWeekdaysRepository')
		private roomsResourcesWeekdaysRepository: IRoomsResourcesWeekdaysRepository,

		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,
	) { }

	async execute(data: IRequest) {
		const { resource_id, week_day, room_id, month, new_room_id, new_week_day } =
			data

		const newRoomExists = await this.roomsRepository.findById(new_room_id)
		if (!newRoomExists) throw new RoomNotFoundException()

		const actualRoomExists = await this.roomsRepository.findById(room_id)
		if (!actualRoomExists) throw new RoomNotFoundException()

		if (week_day < 1 || week_day > 5) throw new WeekdayDoesNotExistException()
		if (new_week_day < 1 || new_week_day > 5)
			throw new WeekdayDoesNotExistException()

		const resourceExists = await this.resourcesRepository.findById(resource_id)
		if (!resourceExists) throw new ResourceNotFoundException()

		if (week_day !== new_week_day) {
			const resourceInMoreThanOneRoomPerDay =
				await this.roomsResourcesWeekdaysRepository.findAllByResourceIdAndDayAndMonth(
					resource_id,
					new_week_day,
					month
				)

			if (resourceInMoreThanOneRoomPerDay.length > 0) {
				throw new ResourceInSeveralRoomsInSameDayException()
			}
		}

		const memberOfNewRoomId = await this.roomsResourcesWeekdaysRepository.findByRoomIdAndMonthAndWeekday(new_room_id, month, new_week_day)

		let countResourcesInRoom

		if (memberOfNewRoomId) {
			countResourcesInRoom = memberOfNewRoomId?.length - 1
		}

		if (countResourcesInRoom) {
			const countAllResourcesInRoom = countResourcesInRoom

			if (newRoomExists.seats <= countAllResourcesInRoom) {
				throw new RoomFullException
			}
		}

		const userAlreadyInRoom =
			await this.roomsResourcesWeekdaysRepository.findByResourceAndRoomIdAndMonthAndWeekday(
				resource_id,
				room_id,
				month,
				week_day
			)

		if (userAlreadyInRoom) {
			userAlreadyInRoom.room_id = new_room_id
			userAlreadyInRoom.week_day = new_week_day

			await this.roomsResourcesWeekdaysRepository.update(userAlreadyInRoom)
		} else {
			throw new RoomOrResourceNotFoundException()
		}
	}
}
