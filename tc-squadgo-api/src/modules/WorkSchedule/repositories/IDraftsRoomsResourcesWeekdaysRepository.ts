import { ResourceRoomWeekDaysEntityDTO } from '../dtos/ResourceRoomWeekDaysEntityDTO'
import DraftsRoomsResourcesWeekdays from '../infra/typeorm/entities/DraftsRoomsResourcesWeekdays'

export default interface IDraftsRoomsResourcesWeekdaysRepository {
    create(draftResourcesRoomsWeekdays: ResourceRoomWeekDaysEntityDTO): Promise<DraftsRoomsResourcesWeekdays>
    list(): Promise<DraftsRoomsResourcesWeekdays[]>
    findById(id: number): Promise<DraftsRoomsResourcesWeekdays | null>
    findDraftByResourceId(resource_id: number): Promise<DraftsRoomsResourcesWeekdays | null>
    findByDraftResourceAndRoomIdAndMonthAndWeekday(resource_id: number, room_id: number, month: number, week_day:number): Promise<DraftsRoomsResourcesWeekdays | null>
    update(resourcesRoomWeekdays: DraftsRoomsResourcesWeekdays): Promise<DraftsRoomsResourcesWeekdays | null>
    deleteById(id: number): Promise<void>
}
