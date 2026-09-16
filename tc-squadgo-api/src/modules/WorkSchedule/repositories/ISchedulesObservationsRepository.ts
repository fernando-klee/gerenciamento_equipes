import CreateScheduleObservationDTO from '../dtos/CreateScheduleObservationDTO'
import SchedulesObservations from '../infra/typeorm/entities/SchedulesObservations'

export default interface ISchedulesObservationsRepository {
  create(scheduleObservation: CreateScheduleObservationDTO): Promise<SchedulesObservations>;
  delete(id: number): Promise<void>;
  list(): Promise<SchedulesObservations[]>;
  update(scheduleObservation: SchedulesObservations): Promise<SchedulesObservations | null>;
  findById(id: number): Promise<SchedulesObservations | null>;
}
