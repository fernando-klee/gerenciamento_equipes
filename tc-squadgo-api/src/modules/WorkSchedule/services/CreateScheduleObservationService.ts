import { inject, injectable } from 'tsyringe'
import SchedulesObservations from '../infra/typeorm/entities/SchedulesObservations'
import ISchedulesObservationsRepository from '../repositories/ISchedulesObservationsRepository'

interface IRequest {
	relator_id: number
	target_id: number
	description: string
}

@injectable()
export default class CreateScheduleObservationService {
	constructor(
		@inject('SchedulesObservationsRepository')
		private schedulesObservationsRepository: ISchedulesObservationsRepository,
	) { }

	async execute({ relator_id, target_id, description }: IRequest): Promise<SchedulesObservations> {

		return await this.schedulesObservationsRepository.create({ relator_id, target_id, description })

	}
}
