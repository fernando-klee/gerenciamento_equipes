// import ICreateUserDTO from '../../../dtos/ICreateUserDTO'
import IUsersRepository from '../../../repositories/IUsersRepository'
import { Repository, DataSource } from 'typeorm'
import User from '../entities/User'
import Role from '../../../../../modules/Authorizations/infra/typeorm/entities/Role'
import Permission from 'modules/Authorizations/infra/typeorm/entities/Permission'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>
	private connection: DataSource

	constructor() {
		this.ormRepository = AppDataSource.getRepository(User)
		this.connection = AppDataSource
	}

	// async create(data: ICreateUserDTO): Promise<User> {
	// 	const user = this.ormRepository.create(data)

	// 	return await this.ormRepository.save(user)
	// }

	async save(user: User): Promise<User> {
		return await this.ormRepository.save(user)
	}

	async findById(user_id: number): Promise<User | null> {
		return await this.ormRepository.findOne({ where: { id: user_id } })
	}

	async findByEmail(email: string): Promise<User | null> {
		return await this.ormRepository.findOne({ where: { email } })
	}

	async listPermissionsByUserId(user_id: number): Promise<Permission[]> {
		const userRoles = await this.connection
			.createQueryBuilder()
			.relation(User, 'roles')
			.of(user_id)
			.loadMany()

		if (userRoles.length > 0) {
			const userPermissions = await this.connection
				.createQueryBuilder()
				.relation(Role, 'permissions')
				.of(userRoles)
				.loadMany()

			return userPermissions
		}

		return []
	}

	async list(): Promise<User[]> {
		return await this.ormRepository.find({ relations: ['roles'] })
	}

	async deleteById(user_id: number): Promise<void> {
		await this.ormRepository.delete(user_id)
	}


}
