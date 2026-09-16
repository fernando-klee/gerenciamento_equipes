import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Rooms from '../../../../../modules/Rooms/infra/typeorm/entities/Rooms'
import Resource from '../../../../../modules/Resources/infra/typeorm/entities/Resource'

@Entity('rooms_resources_weekdays')
export default class RoomResourcesWeekdays extends BaseEntity {
	@Column()
	resource_id: number

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'resource_id' })
	resource: Resource

	@Column()
	room_id: number

	@ManyToOne(() => Rooms)
	@JoinColumn({ name: 'room_id' })
	room: Rooms

	@Column()
	week_day: number

	@Column()
	creator_id: number

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'creator_id' })
	creator: Resource

	@Column()
	month: number

}
