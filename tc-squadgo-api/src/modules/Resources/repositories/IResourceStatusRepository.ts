import FindOrCreateResourceStatusDTO from '../dtos/FindOrCreateResourceStatusDTO'
import SaveResourceStatusDTO from '../dtos/SaveResourceStatusDTO'
import ResourceStatus from '../infra/typeorm/entities/ResourceStatus'

export default interface IResourceStatusRepository {
	findByResourceId(resource_id: number): Promise<ResourceStatus | null>
	findUpdateOrCreate(data: FindOrCreateResourceStatusDTO): Promise<ResourceStatus>
	listByResourceId(resource_id: number): Promise<ResourceStatus[]>
	save(data: SaveResourceStatusDTO): Promise<ResourceStatus>
	saveAll(data: SaveResourceStatusDTO[]): Promise<void>
	deleteByResourceId(resource_id: number): Promise<void>
}
