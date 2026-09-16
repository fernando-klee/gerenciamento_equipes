import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Resource from '../../../../../modules/Resources/infra/typeorm/entities/Resource'


@Entity('schedules_pending')
export default class SchedulesPending extends BaseEntity {

	@Column()
	month: number

	@Column({
		type: 'enum',
		enum: ['APROVADO', 'PENDENTE', 'REPROVADO'],
	})
	status: string

	@Column()
	creator_id: number

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'creator_id' })
	creator: Resource

}
