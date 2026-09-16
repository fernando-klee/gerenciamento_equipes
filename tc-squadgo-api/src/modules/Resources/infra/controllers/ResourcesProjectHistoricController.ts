import { container } from 'tsyringe'
import { Request, Response } from 'express'

import ListResourceProjectHistoricService from '../../services/ListResourceProjectHistoricService'

export default class ResourcesProjectHistoricController {

	async index(req: Request, res: Response): Promise<void> {
		const { resource_id } = req.params
		const service = container.resolve(ListResourceProjectHistoricService)

		const resources = await service.execute(Number(resource_id))

		res.status(202).json(resources)
	}

}
