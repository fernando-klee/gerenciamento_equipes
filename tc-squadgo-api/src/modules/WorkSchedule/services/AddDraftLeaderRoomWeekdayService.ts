import { inject, injectable } from 'tsyringe'
import IResourcesRepository from '../../Resources/repositories/IResourcesRepository'
import ResourceNotFoundException from '../../../shared/infra/exceptions/ResourceNotFoundException'
import { LeaderRoomWeekDaysEntityDTO } from '../dtos/LeaderRoomWeekDaysEntityDTO'
import LeadersRoomWeekdays from '../infra/typeorm/entities/LeadersRoomsWeekdays'
import IDraftLeadersRoomsWeekdaysRepository from '../repositories/IDraftLeadersRoomsWeekdaysRepository'
import DraftsLeadersRoomsWeekdays from '../infra/typeorm/entities/DraftsLeadersRoomsWeekdays'

@injectable()
export default class AddDraftLeaderRoomWeekdayService {
	constructor(
		@inject('ResourcesRepository')
		private resourcesRepository: IResourcesRepository,

		@inject('DraftLeadersRoomsWeekdaysRepository')
		private draftsLeadersRoomWeekdays: IDraftLeadersRoomsWeekdaysRepository
	) {}

	async execute({
		resource_id,
		room_resource_weekday_id,
	}: LeaderRoomWeekDaysEntityDTO): Promise<DraftsLeadersRoomsWeekdays> {
		const resourceExists = await this.resourcesRepository.findById(resource_id)
		if (!resourceExists) throw new ResourceNotFoundException()

		const created = await this.draftsLeadersRoomWeekdays.create({
			resource_id,
			room_resource_weekday_id,
		})

		return created
	}
}
