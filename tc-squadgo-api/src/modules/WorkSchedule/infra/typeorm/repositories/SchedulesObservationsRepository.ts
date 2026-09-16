import ISchedulesObservationsRepository from '../../../../WorkSchedule/repositories/ISchedulesObservationsRepository'
import { Repository } from 'typeorm'
import SchedulesObservations from '../entities/SchedulesObservations'
import AppDataSource from '../../../../../shared/infra/typeorm/data-source'

export default class SchedulesObservationsRepository implements ISchedulesObservationsRepository {
	private ormRepository: Repository<SchedulesObservations>

	constructor() {
		this.ormRepository = AppDataSource.getRepository(SchedulesObservations)
	}

	async create(scheduleObservation: SchedulesObservations): Promise<SchedulesObservations> {
		const createdScheduleObservation = this.ormRepository.create(scheduleObservation)
		return await this.ormRepository.save(createdScheduleObservation)
	}

	async list(): Promise<SchedulesObservations[]> {
		return await this.ormRepository.find()
	}

	async findById(id: number): Promise<SchedulesObservations | null> {
		return await this.ormRepository.findOneBy({ id })
	}

	async update(scheduleObservation: SchedulesObservations): Promise<SchedulesObservations | null> {
		return await this.ormRepository.save(scheduleObservation)
	}

	async delete(id: number): Promise<void> {
		await this.ormRepository.delete(id)
	}
}
