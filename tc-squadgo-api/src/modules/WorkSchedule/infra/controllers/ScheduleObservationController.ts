import { Request, Response } from 'express'
import DeleteScheduleObservationService from '../../services/DeleteScheduleObservationService'
import { container } from 'tsyringe'
import CreateScheduleObservationService from '../../services/CreateScheduleObservationService'
import ListSchedulesObservationService from '../../services/ListSchedulesObservationService'
import CreateScheduleObservationDTO from 'modules/WorkSchedule/dtos/CreateScheduleObservationDTO'

export default class ScheduleObservationController {
	async create(req: Request, res: Response): Promise<void> {
		const { description, relator_id, target_id } = req.body as CreateScheduleObservationDTO

		const service = container.resolve(CreateScheduleObservationService)
		const scheduleObservationCreated = await service.execute({ description, relator_id, target_id })

		res.status(201).json(scheduleObservationCreated)
	}

	async delete(req: Request, res: Response): Promise<void> {
		const
			{
				id
			} = req.body

		const service = container.resolve(DeleteScheduleObservationService)

		await service.execute({
			id
		})

		res.status(204).json()
	}

	async list(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListSchedulesObservationService)

		const listSchedulesObservation = await service.execute()

		res.status(202).json(listSchedulesObservation)
	}
}
