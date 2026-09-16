import { inject, injectable } from 'tsyringe'
import RoomNotFoundException from '../../../shared/infra/exceptions/RoomNotFoundException'
import IRoomsRepository from '../../Rooms/repositories/IRoomsRepository'

interface IRequest {
	id: number
	new_name: string
	new_seats: number
}

@injectable()
export default class UpdateRoom {
	constructor(
		@inject('RoomsRepository')
		private roomsRepository: IRoomsRepository,
	) { }

	async execute(data: IRequest) {
		const { id, new_name, new_seats } = data

        const roomExists = await this.roomsRepository.findById(id)
        if (!roomExists) throw new RoomNotFoundException

		if (roomExists) {
			roomExists.name = new_name
			roomExists.seats = new_seats

			await this.roomsRepository.update(roomExists)
		} else {
			throw new RoomNotFoundException
		}

	}

}
