import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListTypesService from '../../services/ListTypesService'

export default class TypesController {
	async index(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListTypesService)
		const types = await service.execute()

		res.status(202).json(types)
	}
}
