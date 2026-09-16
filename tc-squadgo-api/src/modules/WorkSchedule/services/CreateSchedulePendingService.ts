import { inject, injectable } from 'tsyringe'
import SchedulesPending from '../infra/typeorm/entities/SchedulesPending'
import ISchedulesPendingRepository from '../repositories/ISchedulesPendingRepository'

interface IRequest {
	month: number
	status: string
	creator_id: number
}

@injectable()
export default class CreateSchedulePendingService {
	constructor(
		@inject('SchedulesPendingRepository')
		private schedulesPendingRepository: ISchedulesPendingRepository,
	) {}

	async execute({ month, status, creator_id }: IRequest): Promise<SchedulesPending> {

		return await this.schedulesPendingRepository.create({ month, status, creator_id })

	}
}
