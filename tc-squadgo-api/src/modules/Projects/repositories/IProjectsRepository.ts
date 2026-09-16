import IFilterProjectsByMonthProps from '../dtos/IFilterProjectsByMonthsDTO'
import Project from '../infra/typeorm/entities/Project'

export default interface IProjectsRepository {
	save(project: Project): Promise<Project>
	updateAll(projects: Project[]): Promise<Project[]>
	findById(project_id: number): Promise<Project | null>
	getTotalFutureHoursToStart(): Promise<Project>
	list(): Promise<Project[]>
	listActives(): Promise<Project[]>
	listByMonths(data: IFilterProjectsByMonthProps): Promise<Project[]>
	listWithType(): Promise<Project[]>
	listByCustomerId(customer_id: number): Promise<Project[]>
	listByResponsibleId(responsible_id: number): Promise<Project[]>
	listByResourceId(resource_id: number): Promise<Project[]>
}
