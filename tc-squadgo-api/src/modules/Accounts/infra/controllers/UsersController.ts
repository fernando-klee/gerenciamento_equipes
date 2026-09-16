import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ListUserService from '../../services/ListUserService'
import GetUserProfileService from '../../services/GetUserProfileService'
import UpdateUserService from '../../services/UpdateUserService'
//import UpdateProfileService from '../../services/UpdateProfileService'

interface ICreateBodyProps {
	name: string
	email: string
	roles_ids: number[]
}

interface IUpdateBodyProps {
	name: string
	email: string
	roles_ids: number[]
}

interface IUpdateMyProfileProps {
	name: string
	email: string
}

interface IUpdateMyProfilePasswordProps {
	password: string
	newPassword: string
}

export default class UsersController {
	// async updateMyProfile(req: Request, res: Response): Promise<Response> {
	// 	const { user_id } = req
	// 	const data = req.body as IUpdateMyProfileProps

	// 	const service = container.resolve(UpdateProfileService)
	// 	const userUpdated = await service.execute({ ...data, user_id })

	// 	return res.status(201).send(userUpdated)
	// }

	async update(req: Request, res: Response): Promise<Response> {
		const { user_id } = req.params
		const data = req.body as IUpdateBodyProps

		const service = container.resolve(UpdateUserService)
		const userUpdated = await service.execute({ ...data, user_id: parseInt(user_id, 10) })

		return res.status(201).send(userUpdated)
	}

	async list(req: Request, res: Response): Promise<Response> {
		const service = container.resolve(ListUserService)
		const users = await service.execute()

		return res.status(202).send(users)
	}

	async myProfile(req: Request, res: Response): Promise<Response> {
		const user_id = req.user_id

		const service = container.resolve(GetUserProfileService)
		const userProfile = await service.execute(user_id)

		return res.status(201).send(userProfile)
	}


}
