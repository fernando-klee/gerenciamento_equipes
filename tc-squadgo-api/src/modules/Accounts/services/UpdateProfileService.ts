// import { inject, injectable } from 'tsyringe'

// import { instanceToInstance } from 'class-transformer'

// import UserAlreadyExistsException from '../../../shared/infra/exceptions/UserAlreadyExistsException'
// import User from '../infra/typeorm/entities/User'
// import IUsersRepository from '../repositories/IUsersRepository'
// import UserNotFoundException from '../../../shared/infra/exceptions/UserNotFoundException'
// import ICacheProvider from '../../../shared/providers/cacheProvider/interfaces/ICacheProvider'

// interface IRequest {
// 	user_id: string
// 	name: string
// 	email: string
// }

// @injectable()
// export default class UpdateProfileService {
// 	constructor(
// 		@inject('UsersRepository')
// 		private usersRepository: IUsersRepository,

// 		@inject('CacheProvider')
// 		private cacheProvider: ICacheProvider
// 	) { }

// 	async execute(data: IRequest): Promise<User> {
// 		const { user_id, name, email } = data

// 		const userExistsById = await this.usersRepository.findById(user_id)
// 		if (!userExistsById) throw new UserNotFoundException()

// 		const userExistsByEmail = await this.usersRepository.findByEmail(email)
// 		if (userExistsByEmail && userExistsByEmail.id !== user_id) throw new UserAlreadyExistsException()

// 		Object.assign(userExistsById, {
// 			name,
// 			email
// 		})

// 		const userUpdate = await this.usersRepository.save(userExistsById)

// 		await this.cacheProvider.invalidate('users')

// 		return instanceToInstance(userUpdate)
// 	}
// }
