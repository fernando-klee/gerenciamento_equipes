import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import { Column, Entity } from 'typeorm'

@Entity('department')
export default class Department extends BaseEntity {

	@Column()
	name: string

}
