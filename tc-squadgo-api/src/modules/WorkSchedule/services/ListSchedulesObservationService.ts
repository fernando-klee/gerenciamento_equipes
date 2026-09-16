import { inject, injectable } from 'tsyringe'
import SchedulesObservations from '../infra/typeorm/entities/SchedulesObservations'
import ISchedulesObservationsRepository from '../repositories/ISchedulesObservationsRepository'

@injectable()
export default class ListSchedulesObservationService {
  constructor(
    @inject('SchedulesObservationsRepository')
    private schedulesObservationsRepository: ISchedulesObservationsRepository,
  ) {}

  async execute(): Promise<SchedulesObservations[]> {
    const schedulesPending = await this.schedulesObservationsRepository.list()

    return schedulesPending
  }
}
