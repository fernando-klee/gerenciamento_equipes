import { Request, Response } from 'express'
import ListPermissionsService from '../../services/ListPermissionsService'
import { container } from 'tsyringe'

interface ICreateBodyProps {
	name: string
	description: string
}

export default class PermissionsController {
	async index(req: Request, res: Response): Promise<void> {
		const service = container.resolve(ListPermissionsService)

		const permissions = await service.execute()

		res.status(201).json(permissions)
	}
}
