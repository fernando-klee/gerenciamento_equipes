import { inject, injectable } from 'tsyringe'
import IRoomsResourcesWeekdaysRepository from '../repositories/IRoomsResourcesWeekdaysRepository'
import RoomsResourcesWeekdays from '../infra/typeorm/entities/RoomsResourcesWeekdays'
import RoomOrResourceNotFoundException from '../../../shared/infra/exceptions/RoomOrResourceNotFoundException'

@injectable()
export default class FindRoomsResourcesByIdService {
	constructor(
		@inject('RoomsResourcesWeekdaysRepository')
		private roomsResourcesWeekdaysRepository: IRoomsResourcesWeekdaysRepository
	) { }

	async execute(id: number): Promise<RoomsResourcesWeekdays> {
		const roomOrResourceExist = await this.roomsResourcesWeekdaysRepository.findById(id)
		if (!roomOrResourceExist) throw new RoomOrResourceNotFoundException()
		return roomOrResourceExist
	}
}
