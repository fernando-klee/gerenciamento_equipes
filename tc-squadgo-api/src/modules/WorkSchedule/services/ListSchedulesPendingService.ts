import { inject, injectable } from 'tsyringe'
import SchedulesPending from '../infra/typeorm/entities/SchedulesPending'
import ISchedulesPendingRepository from '../repositories/ISchedulesPendingRepository'

@injectable()
export default class ListSchedulesPendingService {
  constructor(
    @inject('SchedulesPendingRepository')
    private schedulesPendingRepository: ISchedulesPendingRepository,
  ) {}

  async execute(): Promise<SchedulesPending[]> {
    const schedulesPending = await this.schedulesPendingRepository.list()

    return schedulesPending
  }
}
