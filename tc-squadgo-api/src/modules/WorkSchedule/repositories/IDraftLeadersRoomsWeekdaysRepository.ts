import { LeaderRoomWeekDaysEntityDTO } from '../dtos/LeaderRoomWeekDaysEntityDTO'
import DraftsLeadersRoomsWeekdays from '../infra/typeorm/entities/DraftsLeadersRoomsWeekdays'
import LeadersRoomWeekdays from '../infra/typeorm/entities/LeadersRoomsWeekdays'

export default interface IDraftLeadersRoomsWeekdaysRepository {
    create(leadersRoomsWeekdays: LeaderRoomWeekDaysEntityDTO): Promise<DraftsLeadersRoomsWeekdays>
    list(): Promise<DraftsLeadersRoomsWeekdays[]>
    findById(id: number): Promise<DraftsLeadersRoomsWeekdays | null>
    findByResourceIdAndRoomResourceWeekdayId(resource_id: number, room_resource_weekday_id: number): Promise<LeadersRoomWeekdays | null>
    update(leadersRoomWeekdays: DraftsLeadersRoomsWeekdays): Promise<DraftsLeadersRoomsWeekdays | null>
    deleteById(id: number): Promise<void>
}
