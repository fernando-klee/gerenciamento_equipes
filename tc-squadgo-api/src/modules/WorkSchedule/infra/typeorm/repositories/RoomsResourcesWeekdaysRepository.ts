import { Repository } from 'typeorm'
import RoomsResourcesWeekdays from '../entities/RoomsResourcesWeekdays'
import IRoomsResourcesWeekdaysRepository from '../../../repositories/IRoomsResourcesWeekdaysRepository'
import { ResourceRoomWeekDaysEntityDTO } from '../../../dtos/ResourceRoomWeekDaysEntityDTO'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class RoomsResourcesWeekdaysRepository implements IRoomsResourcesWeekdaysRepository {
	private ormRepository: Repository<RoomsResourcesWeekdays>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(RoomsResourcesWeekdays)
	}

	async create(
		resourcesRoomsWeekdays: ResourceRoomWeekDaysEntityDTO
	): Promise<RoomsResourcesWeekdays> {
		const resourceRoomWeekdayCreated = this.ormRepository.create(
			resourcesRoomsWeekdays
		)

		return await this.ormRepository.save(resourceRoomWeekdayCreated)
	}

	async list(): Promise<RoomsResourcesWeekdays[]> {
		return await this.ormRepository.find()
	}

	async findById(id: number): Promise<RoomsResourcesWeekdays | null> {
		return await this.ormRepository.findOne({ where: { id } })
	}

	async findByResourceId(
		resource_id: number
	): Promise<RoomsResourcesWeekdays | null> {
		return await this.ormRepository.findOne({ where: { resource_id } })
	}

	async findByResourceIdAllSchedules(
		resource_id: number
	): Promise<RoomsResourcesWeekdays[] | null> {
		return await this.ormRepository.find({ where: { resource_id } })
	}

	async findByResourceAndRoomIdAndMonthAndWeekday(
		resource_id: number,
		room_id: number,
		month: number,
		week_day: number
	): Promise<RoomsResourcesWeekdays | null> {
		return await this.ormRepository.findOne({
			where: { resource_id, room_id, month, week_day },
		})
	}

	async findByRoomIdAndMonthAndWeekday(
		room_id: number,
		month: number,
		week_day: number
	): Promise<RoomsResourcesWeekdays[] | null> {
		return await this.ormRepository.find({
			where: { room_id, month, week_day },
		})
	}

	async findByCreatorAndMonth(
		resource_id: number,
		month: number,
		creator_id: number
	): Promise<RoomsResourcesWeekdays | null> {
		return await this.ormRepository.findOne({
			where: { resource_id, month, creator_id },
		})
	}

	async update(
		resourcesRoomWeekdays: RoomsResourcesWeekdays
	): Promise<RoomsResourcesWeekdays | null> {
		return await this.ormRepository.save(resourcesRoomWeekdays)
	}

	async deleteById(
		resource_id: number,
		roomResourceWeekdayId: number
	): Promise<void> {
		await this.ormRepository.delete({ resource_id, id: roomResourceWeekdayId })
	}

	async deleteByIdSchedule(id: number): Promise<void> {
		await this.ormRepository.delete(id)
	}

	async deleteAll(): Promise<void> {
		await this.ormRepository.createQueryBuilder().delete().execute()
	}

	async findAllByResourceIdAndDayAndMonth(
		resource_id: number,
		day: number,
		month: number
	): Promise<RoomsResourcesWeekdays[]> {
		return await this.ormRepository.find({
			where: { resource_id, week_day: day, month },
		})
	}
}
