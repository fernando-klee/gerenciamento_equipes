import Permission from '../../../modules/Authorizations/infra/typeorm/entities/Permission'
import User from '../infra/typeorm/entities/User'

export default interface IUsersRepository {
	save(user: User): Promise<User>
	findById(user_id: any): Promise<User | null>
	findByEmail(email: string): Promise<User | null>
	listPermissionsByUserId(user_id: number): Promise<Permission[]>
	list(): Promise<User[]>
	deleteById(user_id: number): Promise<void>
}
