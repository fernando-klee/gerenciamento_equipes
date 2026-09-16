import { Request, Response } from 'express'
import { container } from 'tsyringe'
import RemoveAllResourcesRoom from '../../../WorkSchedule/services/RemoveAllResourcesRoom'

export default class WorkScheduleController {
	async deleteAll(req: Request, res: Response): Promise<void> {
		const service = container.resolve(RemoveAllResourcesRoom)

		service.execute()

		res.status(204).json()
	}

}
