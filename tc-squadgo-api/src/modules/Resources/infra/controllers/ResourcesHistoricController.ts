import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListResourceHistoricService from '../../services/ListResourceHistoricService'

export default class ResourcesHistoricController {

	async index(req: Request, res: Response): Promise<void> {
		const { resource_id } = req.params
		const { qtdPerPage, currentPage } = req.query
		const service = container.resolve(ListResourceHistoricService)
		const data = {
			resource_id: Number(resource_id),
			qtdPerPage: Number(qtdPerPage ?? 6),
			currentPage: Number(currentPage ?? 1)
		}

		const resources = await service.execute(data)

		res.status(202).json(resources)
	}

}
