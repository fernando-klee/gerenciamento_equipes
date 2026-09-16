import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ListClassificationsService from '../../services/ListClassificationsService'

export default class ClassificationsController {
	async index(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListClassificationsService)
		const classifications = await service.execute()

		res.status(202).json(classifications)
	}
}
