import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import User from '../../../../Accounts/infra/typeorm/entities/User'
import Resource from '../../../../Resources/infra/typeorm/entities/Resource'

export enum NotificationType {
	RESOURCES,
	PROJECTS,
	CUSTOMERS,
	VERSION_NOTES,
	PONTO
}

export type NotificationTypeProps = 'RESOURCES' | 'PROJECTS' | 'CUSTOMERS' | 'VERSION_NOTES' | 'PONTO' | 'SCHEDULE'

@Entity('notifications')
export default class Notification extends BaseEntity {
	@Column()
	description: string

	@Column()
	readed: boolean

	@Column({
		enum: NotificationType
	})
	type: string

	@Column({nullable: true})
	object_id?: number

	@Column()
	resource_id: number

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'resource_id' })
	resource: Resource
}

