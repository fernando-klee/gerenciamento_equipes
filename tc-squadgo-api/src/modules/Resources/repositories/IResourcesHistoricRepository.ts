import ICreateResourceHistoricDTO from '../dtos/ICreateResourceHistoricDTO'
import IFilterResourceHistoricDTO from '../dtos/IFilterResourceHistoricDTO'
import ResourceHistoric from '../infra/typeorm/entities/ResourceHistoric'

export default interface IResourcesHistoricRepository {
	save(data: ICreateResourceHistoricDTO): Promise<ResourceHistoric>
	list(data: IFilterResourceHistoricDTO): Promise<any>
}
