import { Request, Response } from 'express'
import { container } from 'tsyringe'

import PlannedReleaseService from '../../services/PlannedReleaseService'
import ShowAllValuesService from '../../services/ShowAllValuesService'

export default class GeralVisionController {
	async plannedRelease(req: Request, rep: Response): Promise<void> {
		const { date }: any = req.query
		const dateConverted = new Date(date)
		const service = container.resolve(PlannedReleaseService)
		const data = await service.execute(dateConverted)
		rep.status(202).json(data)
	}

	async allValues(req: Request, rep: Response): Promise<void> {
		const service = container.resolve(ShowAllValuesService)
		const data = await service.execute()
		rep.status(202).json(data)
	}
}
