import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Resource from '../../../../../modules/Resources/infra/typeorm/entities/Resource'
import RoomResourcesWeekdays from './RoomsResourcesWeekdays'

@Entity('leaders_rooms_weekdays')
export default class LeadersRoomWeekdays extends BaseEntity {
	@Column()
	resource_id: number

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'resource_id' })
	resource: Resource

	@Column()
	room_resource_weekday_id: number

	@ManyToOne(() => RoomResourcesWeekdays)
	@JoinColumn({ name: 'room_resource_weekday_id' })
	roomResourceWeekday: RoomResourcesWeekdays

}
