import { Column, Entity, OneToMany } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'

@Entity('status_resource')
export default class Status extends BaseEntity {
	@Column()
	description: string

	@Column()
	name: string
}
