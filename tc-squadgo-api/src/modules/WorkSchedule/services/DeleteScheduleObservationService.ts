import { inject, injectable } from 'tsyringe'

import ISchedulesObservationsRepository from '../repositories/ISchedulesObservationsRepository'

interface IRequest {
	id: number
}

@injectable()
export default class DeleteScheduleObservationService {
	constructor(

		@inject('SchedulesObservationsRepository')
		private schedulesObservationsRepository: ISchedulesObservationsRepository,
	) { }

	async execute({ id }: IRequest) {
		await this.schedulesObservationsRepository.delete(id)
	}

}
