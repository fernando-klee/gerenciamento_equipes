import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import Customer from '../../../../Customers/infra/typeorm/entities/Customer'
import Project from '../../../../Projects/infra/typeorm/entities/Project'
import Resource from '../../../../Resources/infra/typeorm/entities/Resource'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import User from '../../../../Accounts/infra/typeorm/entities/User'

enum FeedbackType {
	PROJECT, CUSTOMER, PERSONAL, RESOURCE
}

@Entity('feedbacks')
export default class Feedback extends BaseEntity {

	@Column()
	description: string

	@Column({
		enum: FeedbackType
	})
	type: string

	@Column()
	resource_id: number

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'resource_id' })
	resource: Resource

	@Column()
	reporter_id: number

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'reporter_id' })
	reporter: Resource

	@Column()
	project_id?: number

	@ManyToOne(() => Project)
	@JoinColumn({ name: 'project_id' })
	project: Project

	@Column()
	customer_id?: number

	@ManyToOne(() => Customer)
	@JoinColumn({ name: 'customer_id' })
	customer: Customer
}
