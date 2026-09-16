import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Rooms from '../../../../Rooms/infra/typeorm/entities/Rooms'
import Resource from '../../../../Resources/infra/typeorm/entities/Resource'


@Entity('rooms_resources')
export default class RoomResource extends BaseEntity{

	@Column()
	room_id: number
	
	@ManyToOne(() => Rooms)
	@JoinColumn({ name: 'room_id' })
	rooms: Rooms

	@Column()
	resource_id: number

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'resource_id' })
	resource: Resource

	@Column()
	leader: boolean
}
