import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Resource from './Resource'
import Status from './Status'
import Substatus from './Substatus'

@Entity('resources_status')
export default class ResourceStatus extends BaseEntity {

	@Column()
	resource_id: number

	@OneToOne(() => Resource)
	@JoinColumn({ name: 'resource_id' })
	resource: Resource

	@Column()
	status_id: number

	@ManyToOne(() => Status)
	@JoinColumn({ name: 'status_id' })
	status: Status

	@Column({ nullable: true })
	substatus_id: number | null

	@ManyToOne(() => Substatus)
	@JoinColumn({ name: 'substatus_id' })
	substatus: Substatus
}
