import { Request, Response } from 'express'
import ListUserPermissionsService from '../../services/ListUserPermissionsService'
import { container } from 'tsyringe'

export default class UsersPermissionsController {
	async index(req: Request, res: Response): Promise<void> {
		const { user_id } = req
		const service = container.resolve(ListUserPermissionsService)

		const permissions = await service.execute(user_id)

		res.status(201).json(permissions)
	}
}
