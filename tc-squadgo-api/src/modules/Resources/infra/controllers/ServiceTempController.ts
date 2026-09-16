import { Response, Request } from 'express'
import { container } from 'tsyringe'
import TempService from '../../services/TempService'

export default class ServiceTempController {
	async execute(req: Request, res: Response): Promise<void> {
		const service = container.resolve(TempService)

		const classifications = await service.execute()

		res.status(202).json(classifications)
	}

}
