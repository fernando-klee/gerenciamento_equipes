import { ResourceRoomWeekDaysEntityDTO } from '../dtos/ResourceRoomWeekDaysEntityDTO'
import RoomsResourcesWeekdays from '../infra/typeorm/entities/RoomsResourcesWeekdays'

export default interface IRoomsResourcesWeekdaysRepository {
	create(resourcesRoomsWeekdays: ResourceRoomWeekDaysEntityDTO): Promise<RoomsResourcesWeekdays>
	list(): Promise<RoomsResourcesWeekdays[]>
	findById(id: number): Promise<RoomsResourcesWeekdays | null>
	findByResourceId(resource_id: number): Promise<RoomsResourcesWeekdays | null>
	findByResourceIdAllSchedules(resource_id: number): Promise<RoomsResourcesWeekdays[] | null>
	findByResourceAndRoomIdAndMonthAndWeekday(resource_id: number, room_id: number, month: number, week_day: number): Promise<RoomsResourcesWeekdays | null>
	findByRoomIdAndMonthAndWeekday(room_id: number, month: number, week_day: number): Promise<RoomsResourcesWeekdays[] | null>
	findByCreatorAndMonth(resource_id: number, month: number, creator_id: number): Promise<RoomsResourcesWeekdays | null>
	update(resourcesRoomWeekdays: RoomsResourcesWeekdays): Promise<RoomsResourcesWeekdays | null>
	deleteById(resource_id: number, roomResourceWeekdayId: number): Promise<void>
	deleteByIdSchedule(id: number | null): Promise<void>
	deleteAll(): Promise<void>
	findAllByResourceIdAndDayAndMonth(resource_id: number, day: number, month: number): Promise<RoomsResourcesWeekdays[]>
}
