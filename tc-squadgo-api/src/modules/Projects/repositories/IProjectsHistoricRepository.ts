import ICreateProjectHistoricDTO from '../dtos/ICreateProjectHistoricDTO'
import IFilterProjectsHistoricDTO from '../dtos/IFilterProjectsHistoricDTO'
import ProjectHistoric from '../infra/typeorm/entities/ProjectHistoric'

export default interface IProjectsHistoricRepository {
	create(data: ICreateProjectHistoricDTO): Promise<ProjectHistoric>
	listByProjectId(data: IFilterProjectsHistoricDTO): Promise<any>
}
