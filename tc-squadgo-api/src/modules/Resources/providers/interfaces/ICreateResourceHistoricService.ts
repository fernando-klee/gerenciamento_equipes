import ICreateResourceHistoricDTO from '../../dtos/ICreateResourceHistoricDTO'
import ResourceHistoric from '../../infra/typeorm/entities/ResourceHistoric'

export default interface ICreateResourceHistoricService {
	execute(data: ICreateResourceHistoricDTO): Promise<ResourceHistoric>
}
