import { Request, Response } from 'express'
import UpdateRoom from '../../services/UpdateRoomService'
import { container } from 'tsyringe'
import AddNewRoom from '../../services/AddNewRoomService'
import RemoveRoom from '../../services/RemoveRoomService'
import ListRooms from '../../services/ListRoomService'

export default class RoomsController {
	async create(req: Request, res: Response): Promise<void> {
		const
			{
				name,
				seats
			} = req.body

		const service = container.resolve(AddNewRoom)

		const RoomAdded = await service.execute({
			name,
			seats
		})

		res.status(201).json(RoomAdded)
	}

	async update(req: Request, res: Response): Promise<void> {
		const
			{
				id,
				new_name,
				new_seats
			} = req.body

		const service = container.resolve(UpdateRoom)
		const UpdatedResource = await service.execute({
			id,
			new_name,
			new_seats
		})

		res.status(200).json(UpdatedResource)

	}

	async delete(req: Request, res: Response): Promise<void> {
		const
			{
				id
			} = req.body

		const service = container.resolve(RemoveRoom)

		await service.execute({
			id,
		})

		res.status(204).json()
	}

	async list(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListRooms)

		const listRooms = await service.execute()

		res.status(200).json(listRooms)
	}
}
