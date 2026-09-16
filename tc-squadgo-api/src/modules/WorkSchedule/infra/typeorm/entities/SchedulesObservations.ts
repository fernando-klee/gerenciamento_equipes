import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Resource from '../../../../../modules/Resources/infra/typeorm/entities/Resource'

@Entity('schedules_observations')
export default class SchedulesObservations extends BaseEntity {
	@Column()
	description: string

	@Column()
	relator_id: number

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'relator_id' })
	relator: Resource

	@Column()
	target_id: number

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'target_id' })
	target: Resource
}
