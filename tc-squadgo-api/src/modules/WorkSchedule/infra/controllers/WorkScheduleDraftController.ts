import { Request, Response } from 'express'
import { container } from 'tsyringe'
// import ListWorkScheduleDraftService from '../../../WorkSchedule/services/ListWorkScheduleDraftService'
// import FindDraftById from '../../../WorkSchedule/services/FindDraftById'
// import FindByResourceRoomDayService from '../../../WorkSchedule/services/FindByResourceRoomDayService'

export default class WorkScheduleDraftController {
	// async list(req: Request, res: Response): Promise<void> {
	// 	const service = container.resolve(ListWorkScheduleDraftService)

	// 	const ListRooms = await service.execute()

	// 	res.status(200).json(ListRooms)
	// }

	// async findById(req: Request, res: Response): Promise<void> {
	// 	const { id } = req.params
	// 	const service = container.resolve(FindDraftById)
	// 	const draft = await service.execute(Number(id))

	// 	console.log(draft)
	// 	res.status(202).json(draft)
	// }

	// async findByResourceAndRoomAndDay(req: Request, res: Response): Promise<void> {
	// 	const { resource_id, room_id, weekday_id } = req.params
	// 	const service = container.resolve(FindByResourceRoomDayService)
	// 	const draft = await service.execute(Number(resource_id), Number(room_id), Number(weekday_id))

	// 	console.log(draft)
	// 	res.status(202).json(draft)
	// }
}
