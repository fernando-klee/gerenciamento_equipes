import { inject, injectable } from 'tsyringe'
import SchedulesPending from '../infra/typeorm/entities/SchedulesPending'
import ISchedulesPendingRepository from '../repositories/ISchedulesPendingRepository'

interface IRequest {
	id: number;
	status: string;
}

@injectable()
export default class UpdateSchedulePendingService {
	constructor(
		@inject('SchedulesPendingRepository')
		private schedulesPendingRepository: ISchedulesPendingRepository,
	) { }

	async execute({ id, status }: IRequest): Promise<SchedulesPending | null> {
		const existingSchedulePending = await this.schedulesPendingRepository.findById(id)

		if (!existingSchedulePending) {
			throw new Error('Agendamento pendente não encontrado.')
		}

		existingSchedulePending.status = status
		await this.schedulesPendingRepository.update(existingSchedulePending)

		return existingSchedulePending
	}
}
