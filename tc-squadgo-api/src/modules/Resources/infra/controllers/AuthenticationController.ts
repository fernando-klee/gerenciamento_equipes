import { Request, Response } from 'express'
// import AuthenticateUserService from '../../../../modules/Accounts/services/AuthenticateUserService'
import { container } from 'tsyringe'

interface ICreateBodyProps {
	email: string
	password: string
}

export default class AuthenticationController {
	// async create(req: Request, res: Response): Promise<void> {
	// 	const { email, password } = req.body as ICreateBodyProps
	// 	const service = container.resolve(AuthenticateUserService)

	// 	const signed = await service.execute(email, password)

	// 	res.status(201).json(signed)
	// }
}
