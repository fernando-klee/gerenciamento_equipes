import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Resource from '../../../../../modules/Resources/infra/typeorm/entities/Resource'
import DraftsRoomsResourcesWeekdays from './DraftsRoomsResourcesWeekdays'

@Entity('drafts_leaders_rooms_weekdays')
export default class DraftsLeadersRoomsWeekdays extends BaseEntity {
	@Column()
	resource_id: number

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'resource_id' })
	resource: Resource

	@Column()
	room_resource_weekday_id: number

	@ManyToOne(() => DraftsRoomsResourcesWeekdays)
	@JoinColumn({ name: 'room_resource_weekday_id' })
	roomResourceWeekday: DraftsRoomsResourcesWeekdays

}
