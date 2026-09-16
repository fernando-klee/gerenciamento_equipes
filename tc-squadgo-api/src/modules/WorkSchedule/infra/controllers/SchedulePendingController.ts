import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateSchedulePendingService from '../../services/CreateSchedulePendingService'
import UpdateSchedulePendingService from '../../services/UpdateSchedulePendingService'
import ListSchedulesObservationService from '../../services/ListSchedulesObservationService'
import CreateSchedulePendingDTO from '../../../WorkSchedule/dtos/CreateSchedulePendingDTO'

export default class ScheduleObservationController {
	async create(req: Request, res: Response): Promise<void> {
		const { creator_id, month, status } = req.body as CreateSchedulePendingDTO

		const service = container.resolve(CreateSchedulePendingService)
		const schedulePendingCreated = await service.execute({ creator_id, month, status })

		res.status(201).json(schedulePendingCreated)
	}

	async list(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListSchedulesObservationService)

		const listSchedulesObservation = await service.execute()

		res.status(202).json(listSchedulesObservation)
	}

	async update(req: Request, res: Response): Promise<void> {
		const
			{
				id,
				status
			} = req.body

		const service = container.resolve(UpdateSchedulePendingService)
		const UpdatedSchedulePending = await service.execute({
			id,
			status
		})

		res.status(200).json(UpdatedSchedulePending)

	}
}
