import { Column, Entity } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'

@Entity('substatus_status_resource')
export default class Substatus extends BaseEntity {
	@Column()
	description: string

	@Column()
	name: string

	@Column({ nullable: true })
	color: string
}
