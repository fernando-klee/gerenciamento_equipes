import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ListUserService from '../../../Accounts/services/ListUserService'
// import CreateUserService from '../../../../modules/Accounts/services/CreateUserService'
import GetUserProfileService from '../../../Accounts/services/GetUserProfileService'
import UpdateUserService from '../../../Accounts/services/UpdateUserService'
// import UpdateProfileService from '../../../Accounts/services/UpdateProfileService'
// import UpdateProfilePasswordService from '../../../Accounts/services/UpdateProfilePasswordService'
// import DeleteUserService from '../../../Accounts/services/DeleteUserService'

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
	// async create(req: Request, res: Response): Promise<Response> {
	// 	const data = req.body as ICreateBodyProps

	// 	const service = container.resolve(CreateUserService)
	// 	const userCreated = await service.execute(data)

	// 	return res.status(201).send(userCreated)
	// }

	// async updateMyProfile(req: Request, res: Response): Promise<Response> {
	// 	const { user_id } = req
	// 	const data = req.body as IUpdateMyProfileProps

	// 	const service = container.resolve(UpdateProfileService)
	// 	const userUpdated = await service.execute({ ...data, user_id })

	// 	return res.status(201).send(userUpdated)
	// }

	// async updateMyPassword(req: Request, res: Response): Promise<Response> {
	// 	const { user_id } = req
	// 	const data = req.body as IUpdateMyProfilePasswordProps

	// 	const service = container.resolve(UpdateProfilePasswordService)
	// 	const userUpdated = await service.execute({ ...data, user_id })

	// 	return res.status(201).send(userUpdated)
	// }

	async update(req: Request, res: Response): Promise<Response> {
		const { user_id } = req.params
		const data = req.body as IUpdateBodyProps

		const service = container.resolve(UpdateUserService)
		const userUpdated = await service.execute({ ...data, user_id: Number(user_id) })

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

	// async delete(req: Request, res: Response): Promise<Response> {
	// 	const { user_id: logged_user_id } = req
	// 	const { user_id } = req.params

	// 	const service = container.resolve(DeleteUserService)
	// 	await service.execute(Number(user_id), Number(logged_user_id))

	// 	return res.status(201).send()
	// }
}
