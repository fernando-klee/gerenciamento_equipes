import { inject, injectable } from 'tsyringe'

import IRoomsRepository from '../repositories/IRoomsRepository'
import RoomNotFoundException from '../../../shared/infra/exceptions/RoomNotFoundException'
import Rooms from '../infra/typeorm/entities/Rooms'

interface IRequest {
	name: string
	seats: number
}

@injectable()
export default class AddNewRoom {
	constructor(
		@inject('RoomsRepository')
		private roomsRepository: IRoomsRepository,
	) { }

	async execute(data: IRequest) {
		const { name, seats } = data

		const roomAlreadyExists = await this.roomsRepository.findByName(name)
		if (roomAlreadyExists) throw new RoomNotFoundException

		const room = new Rooms()
		Object.assign(room, {
			name,
			seats
		})

		if (!roomAlreadyExists) await this.roomsRepository.save(room)

	}

}
