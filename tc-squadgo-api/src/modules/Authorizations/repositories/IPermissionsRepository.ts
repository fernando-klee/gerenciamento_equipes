import Permission from '../infra/typeorm/entities/Permission'

export default interface IPermissionsRepository {
	save(permission: Permission): Promise<Permission>
	findBySlug(slug: string): Promise<Permission | null>
	list(): Promise<Permission[]>
	listByIds(permissions_ids: number[]): Promise<Permission[]>
}
