import Permission from '../../../modules/Authorizations/infra/typeorm/entities/Permission'
import ICreateUserDTO from '../dtos/ICreateUserDTO'
import User from '../infra/typeorm/entities/User'

export default interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<User>
	save(user: User): Promise<User>
	findById(user_id: number): Promise<User | undefined>
	findByEmail(email: string): Promise<User | undefined>
	listPermissionsByUserId(user_id: number): Promise<Permission[]>
	list(): Promise<User[]>
	deleteById(user_id: number): Promise<void>
}
