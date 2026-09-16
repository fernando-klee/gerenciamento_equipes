import ICreateProjectsResourcesRepository from '../dtos/ICreateProjectsResourcesRepository'
import ProjectResource from '../infra/typeorm/entities/ProjectResource'

export default interface IProjectsResourcesRepository {
	save(data: ICreateProjectsResourcesRepository): Promise<ProjectResource>
	saveAll(data: ICreateProjectsResourcesRepository[]): Promise<void>
	listByResourceId(resource_id: number): Promise<ProjectResource[]>
	getResourceHoursLeft(resource_id: number): Promise<ProjectResource>
	listResourcesWithHoursLeft(): Promise<ProjectResource[]>
	listFutureProjectsByDate(date: string): Promise<ProjectResource[]>
	listByResourceIdWithRelations(resource_id: number): Promise<ProjectResource[]>
	listAllActives(): Promise<ProjectResource[]>
	list(): Promise<ProjectResource[]>
	deleteAllByProjectId(project_id: number): Promise<void>
	findByResourceIdAndProjectId(resource_id: number, project_id: number): Promise<ProjectResource | null>
	listByProject(project_id: number): Promise<ProjectResource[]>
	listResourcesByProject(project_id: number): Promise<ProjectResource[]>
	deleteAllByResourceId(resource_id: number): Promise<void>
	delete(projectResource: ProjectResource): Promise<void>
}
