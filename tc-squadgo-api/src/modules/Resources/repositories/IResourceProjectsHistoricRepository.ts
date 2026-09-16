import ResourceProjectsHistoric from '../infra/typeorm/entities/ResourceProjectsHistoric'

export default interface IResourceProjectsHistoricRepository {
	listByResourceId(resource_id: number): Promise<ResourceProjectsHistoric[]>
	updateOrCreate(resource_id: number, project_id: number): Promise<ResourceProjectsHistoric>
	findByResourceAndProject(resource_id: number, project_id: number): Promise<ResourceProjectsHistoric | null>
}
