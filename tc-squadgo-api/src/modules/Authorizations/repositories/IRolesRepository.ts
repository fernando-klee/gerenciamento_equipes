import Role from '../infra/typeorm/entities/Role'

export default interface IRolesRepository {
	save(role: Role): Promise<Role>
	findByName(name: string): Promise<Role | null>
	findById(id: number): Promise<Role | null>
	deleteById(id: number): Promise<void>
	list(): Promise<Role[]>
	listByIds(roles_ids: number[]): Promise<Role[]>
}
