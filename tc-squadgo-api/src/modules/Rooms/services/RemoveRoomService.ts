import { inject, injectable } from 'tsyringe'

import IRoomsRepository from '../../Rooms/repositories/IRoomsRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import RoomNotFoundException from '../../../shared/infra/exceptions/RoomNotFoundException'
import ResourceIsNotInThatRoomException from '../../../shared/infra/exceptions/ResourceIsNotInThatRoomException'

interface IRequest {
	id: number
}

@injectable()
export default class RemoveRoom {
	constructor(
		@inject('RoomsRepository')
		private roomsRepository: IRoomsRepository
	) { }

	async execute(data: IRequest) {
		const { id } = data

        const roomExist = await this.roomsRepository.findById(id)
        if (!roomExist) throw new RoomNotFoundException

		if (roomExist) await this.roomsRepository.deleteById(roomExist.id)
	}

}
