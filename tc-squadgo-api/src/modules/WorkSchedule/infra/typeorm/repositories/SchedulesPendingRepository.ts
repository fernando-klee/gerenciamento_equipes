import ISchedulesPendingRepository from '../../../../WorkSchedule/repositories/ISchedulesPendingRepository'
import { Repository } from 'typeorm'
import SchedulesPending from '../entities/SchedulesPending'
import CreateSchedulePendingDTO from '../../../../WorkSchedule/dtos/CreateSchedulePendingDTO'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class SchedulesPendingRepository implements ISchedulesPendingRepository {
	private ormRepository: Repository<SchedulesPending>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(SchedulesPending)
	}

	async create(schedulePending: CreateSchedulePendingDTO): Promise<SchedulesPending> {
		const createdSchedulePending = this.ormRepository.create(schedulePending)

		return await this.ormRepository.save(createdSchedulePending)
	}

	async list(): Promise<SchedulesPending[]> {
		return await this.ormRepository.find()
	}

	async findById(id: number): Promise<SchedulesPending | null> {
		return await this.ormRepository.findOneBy({ id })
	}

	async update(schedulePending: SchedulesPending): Promise<SchedulesPending | null> {
		return await this.ormRepository.save(schedulePending)
	}

	async delete(id: number): Promise<void> {
		await this.ormRepository.delete(id)
	}
}
