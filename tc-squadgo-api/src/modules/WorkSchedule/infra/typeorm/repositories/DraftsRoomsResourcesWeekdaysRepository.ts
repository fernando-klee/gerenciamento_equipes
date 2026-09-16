import IDraftsRoomsResourcesWeekdaysRepository from '../../../../../modules/WorkSchedule/repositories/IDraftsRoomsResourcesWeekdaysRepository'
import { Repository } from 'typeorm'
import DraftsRoomsResourcesWeekdays from '../entities/DraftsRoomsResourcesWeekdays'
import { ResourceRoomWeekDaysEntityDTO } from '../../../../../modules/WorkSchedule/dtos/ResourceRoomWeekDaysEntityDTO'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class DraftsRoomsResourcesWeekdaysRepository implements IDraftsRoomsResourcesWeekdaysRepository {
	private ormRepository: Repository<DraftsRoomsResourcesWeekdays>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(DraftsRoomsResourcesWeekdays)
	}

    async create(draftResourcesRoomsWeekdays: ResourceRoomWeekDaysEntityDTO): Promise<DraftsRoomsResourcesWeekdays> {
		const draftResourceRoomWeekdayCreated = this.ormRepository.create(draftResourcesRoomsWeekdays)

		return await this.ormRepository.save(draftResourceRoomWeekdayCreated)
	}

    async list(): Promise<DraftsRoomsResourcesWeekdays[]> {
		return await this.ormRepository.find()
	}

    async findById(id: number): Promise<DraftsRoomsResourcesWeekdays | null> {
		return await this.ormRepository.findOne({ where: { id } })
	}

	async findDraftByResourceId(resource_id: number): Promise<DraftsRoomsResourcesWeekdays | null> {
		return await this.ormRepository.findOne({ where: { resource_id } })
	}

	async findByDraftResourceAndRoomIdAndMonthAndWeekday(resource_id: number, room_id: number, month: number, week_day: number): Promise<DraftsRoomsResourcesWeekdays | null> {
		return await this.ormRepository.findOne({ where: { resource_id, room_id, month, week_day } })
	}

    async update(resourcesRoomWeekdays: DraftsRoomsResourcesWeekdays): Promise<DraftsRoomsResourcesWeekdays | null> {
		return await this.ormRepository.save(resourcesRoomWeekdays)
	}

	async deleteById(id: number): Promise<void> {
		await this.ormRepository.delete(id)
	}

}
