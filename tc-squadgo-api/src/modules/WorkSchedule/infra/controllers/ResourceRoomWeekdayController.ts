import { Request, Response } from 'express'
import { container, inject } from 'tsyringe'
import AddResourceRoomWeekdayService from '../../services/AddResourceRoomWeekdayService'
import ListResourceRoomWeekdayService from '../../services/ListResourceRoomWeekdayService'
import UpdateRoomsResourcesService from '../../services/UpdateRoomsResourcesService'
import AddScheduleResourcesService from '../../services/AddScheduleResourcesService'
import RemoveResourceRoomToDayOfWeek from '../../services/RemoveResourceRoomWeekdayService'
import RemoveAllResourcesRoom from '../../services/RemoveAllResourcesRoom'
import SendScheduleMailService from '../../services/SendScheduleMailService'
interface CreateRequestBody {
	week_day: number;
	room_id: number;
	creator_id: string;
	month: number;
	resource_id: number;
}

interface ResourceRequest {
	data: {
		week_day: number;
		room_id: number;
		creator_id: string;
		month: number;
		sendMail: boolean;
		resource_id: number;
	}[];
}

interface DeleteRequest {
  data: {
    resource_id: number;
    room_resource_weekday_id: number;
  }[];
}

interface ExtendedRequest extends Request {
	user_id: string; // Assuming `user_id` is the property name for the creator_id
}

export default class ResourceRoomWeekdayController {
	async create(req: Request, res: Response): Promise<void> {
		const { week_day, room_id, month, resource_id } =
			req.body as CreateRequestBody
		const creator_id = req.user_id

		const service = container.resolve(AddResourceRoomWeekdayService)
		const resourceRoomWeekDayCreated = await service.execute({
			week_day,
			room_id,
			creator_id,
			month,
			resource_id,
		})

		res.status(201).json(resourceRoomWeekDayCreated)
	}

	async deleteById(req: Request, res: Response): Promise<void> {
		const { data } = req.body as DeleteRequest

		const service = container.resolve(RemoveResourceRoomToDayOfWeek)

		await service.execute({
			data,
		})

		res.status(204).json()
	}

	async list(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListResourceRoomWeekdayService)

		const ListResourceRoomsWeekday = await service.execute()

		res.status(202).json(ListResourceRoomsWeekday)
	}

	async update(req: Request, res: Response): Promise<void> {
		const
		{
			resource_id,
			room_id,
			month,
			week_day,
			new_room_id,
			new_week_day
		} = req.body
		// const { resourcesToUpdate } = req.body

		// const creator_id = req.user_id

		const service = container.resolve(UpdateRoomsResourcesService)
		const updatedResources = await service.execute({
			resource_id,
			room_id,
			month,
			week_day,
			new_room_id,
			new_week_day
		})

		res.status(200).json(updatedResources)
	}

	async createSchedule(req: ExtendedRequest, res: Response): Promise<void> {
		const { data } = req.body as ResourceRequest
		const creator_id = req.user_id

		const service = container.resolve(AddScheduleResourcesService)
		const resourceRoomWeekDaysCreated = await service.execute({
			data,
			creator_id
		})

		res.status(201).json(resourceRoomWeekDaysCreated)
	}

	async deleteAll(req: Request, res: Response): Promise<void> {
		const service = container.resolve(RemoveAllResourcesRoom)

		service.execute()

		res.status(204).json()
	}

	async sendMail(req: Request, res: Response): Promise<void> {

		const service = container.resolve(SendScheduleMailService)
		const scheduleMailSend = await service.execute()

		res.status(201).json(scheduleMailSend)
	}
}
