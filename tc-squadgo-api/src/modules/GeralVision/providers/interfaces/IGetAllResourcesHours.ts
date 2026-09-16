import GetResourcesHoursDTO from '../../dtos/GetResourcesHoursDTO'

export default interface IGetAllResourcesHours {
	execute(): Promise<GetResourcesHoursDTO>
}
