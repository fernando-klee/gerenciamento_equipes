import ResourceAvailableHoursDTO from '../dtos/ResourceAvailableHoursDTO'

export default interface IGetResourceAvailableHours {
	execute(resource_id: number): Promise<ResourceAvailableHoursDTO>
}
