import { Repository } from 'typeorm'
import LeadersRoomWeekdays from '../entities/LeadersRoomsWeekdays'
import { LeaderRoomWeekDaysEntityDTO } from '../../../../../modules/WorkSchedule/dtos/LeaderRoomWeekDaysEntityDTO'
import IDraftLeadersRoomsWeekdaysRepository from '../../../../../modules/WorkSchedule/repositories/IDraftLeadersRoomsWeekdaysRepository'
import DraftsLeadersRoomsWeekdays from '../entities/DraftsLeadersRoomsWeekdays'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class DraftLeadersRoomsWeekdaysRepository implements IDraftLeadersRoomsWeekdaysRepository {
	private ormRepository: Repository<DraftsLeadersRoomsWeekdays>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(DraftsLeadersRoomsWeekdays)
	}

    async create(leadersRoomsWeekdays: LeaderRoomWeekDaysEntityDTO): Promise<DraftsLeadersRoomsWeekdays> {
		const leaderRoomWeekdayCreated = this.ormRepository.create(leadersRoomsWeekdays)

		return await this.ormRepository.save(leaderRoomWeekdayCreated)
	}

    async list(): Promise<DraftsLeadersRoomsWeekdays[]> {
		return await this.ormRepository.find()
	}

    async findById(id: number): Promise<DraftsLeadersRoomsWeekdays | null> {
		return await this.ormRepository.findOne({ where: { id } })
	}

	async findByResourceIdAndRoomResourceWeekdayId(resource_id: number, room_resource_weekday_id: number): Promise<DraftsLeadersRoomsWeekdays | null> {
		return await this.ormRepository.findOne({ where: { resource_id, room_resource_weekday_id } })
	}

    async update(leadersRoomWeekdays: DraftsLeadersRoomsWeekdays): Promise<DraftsLeadersRoomsWeekdays | null> {
		return await this.ormRepository.save(leadersRoomWeekdays)
	}

	async deleteById(id: number): Promise<void> {
		await this.ormRepository.delete(id)
	}

}
