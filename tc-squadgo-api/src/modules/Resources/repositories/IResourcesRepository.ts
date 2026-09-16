import Resource from '../infra/typeorm/entities/Resource'
import Permission from '../../Authorizations/infra/typeorm/entities/Permission'

export default interface IResourcesRepository {
	save(resource: Resource): Promise<Resource>
	findById(resource_id: number | null) : Promise<Resource | null>
	findByEmail(resource_email: string): Promise<Resource | null>
	list(): Promise<Resource[]>
	listResponsibles(): Promise<Resource[]>
	listByIds(resources_ids: number[]): Promise<Resource[] | null>
	listActives(): Promise<Resource[]>
	showSimpleProfile(resource_id: number): Promise<Resource | null>
	findWithClassification(resource_id: number): Promise<Resource | null>
	findByRegistry(user_id: string): Promise<Resource | null>
	listPermissionsByResourceId(resource_id: number): Promise<Permission[]>
	listWithRoles(): Promise<Resource[]>
	deleteById(id: number): Promise<void>
	findByOnlyResourceByRegistry(registry: string): Promise<Resource | null>
}
