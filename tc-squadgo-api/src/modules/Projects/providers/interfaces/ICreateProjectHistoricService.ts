import ProjectHistoric from '../../infra/typeorm/entities/ProjectHistoric'
import ICreateProjectHistoricDTO from '../../dtos/ICreateProjectHistoricDTO'

export default interface ICreateProjectHistoricService {
	execute(data: ICreateProjectHistoricDTO): Promise<ProjectHistoric>
}
