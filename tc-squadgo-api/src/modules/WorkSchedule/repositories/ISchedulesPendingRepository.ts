import CreateSchedulePendingDTO from '../dtos/CreateSchedulePendingDTO'
import SchedulesPending from '../infra/typeorm/entities/SchedulesPending'

export default interface ISchedulesPendingRepository {
  create(scheduleObservation: CreateSchedulePendingDTO): Promise<SchedulesPending>;
  delete(id: number): Promise<void>;
  list(): Promise<SchedulesPending[]>;
  update(scheduleObservation: SchedulesPending): Promise<SchedulesPending | null>;
  findById(id: number): Promise<SchedulesPending | null>;
}
