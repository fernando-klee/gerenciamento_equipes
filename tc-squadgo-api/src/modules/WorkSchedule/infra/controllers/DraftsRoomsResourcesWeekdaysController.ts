import { Request, Response } from 'express'
import RemoveDraftResourceRoom from '../../../WorkSchedule/services/RemoveDraftResourceRoom'
import { container, inject } from 'tsyringe'
import AddDraftsRoomsResourcesWeekdaysService from '../../../WorkSchedule/services/AddDraftsRoomsResourcesWeekdaysService'
import ListDraftResourceRoomWeekdayService from '../../../WorkSchedule/services/ListDraftResourceRoomWeekdayService'
import UpdateDraftRoomsResourcesService from '../../../WorkSchedule/services/UpdateDraftRoomsResourcesService'
interface CreateRequestBody {
	week_day: number
	room_id: number
	creator_id: string
	month: number
	resource_id: number
}

export default class DraftsRoomsResourcesWeekdaysController {
	async create(req: Request, res: Response): Promise<void> {
		const { week_day, room_id, month, resource_id } = req.body as CreateRequestBody
		const creator_id = req.user_id

		const service = container.resolve(AddDraftsRoomsResourcesWeekdaysService)
		const resourceRoomWeekDayCreated = await service.execute({ week_day, room_id, creator_id, month, resource_id })

		res.status(201).json(resourceRoomWeekDayCreated)
	}

	async delete(req: Request, res: Response): Promise<void> {
		const
			{
				resource_id,
				room_id,
				month,
				week_day
			} = req.body

		const service = container.resolve(RemoveDraftResourceRoom)

		await service.execute({
			resource_id,
			room_id,
			month,
			week_day
		})

		res.status(204).json()
	}

	async list(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListDraftResourceRoomWeekdayService)

		const ListResourceRoomsWeekday = await service.execute()

		res.status(202).json(ListResourceRoomsWeekday)
	}

	async update(req: Request, res: Response): Promise<void> {
		const
			{
				resource_id,
				new_room_id,
				new_week_day,
				new_month
			} = req.body

		const service = container.resolve(UpdateDraftRoomsResourcesService)
		const UpdatedResource = await service.execute({
			new_room_id,
			new_week_day,
			new_month,
			resource_id
		})

		res.status(200).json(UpdatedResource)
	}
}
