import { Column, Entity } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'

export enum TypeProps {
	PROJECTS, CUSTOMERS, RESOURCES, USERS, PERMISSIONS_GROUP, SKILLS, VERSION_NOTES,
	GERAL, CONFIGURATIONS_MENU, DASHBOARD, CUSTOMERS_MENU, SKILLS_MENU, GERAL_VISION_MENU, WORK_SCHEDULES
}

export enum ActionProps {
	CREATE, UPDATE, VIEW, DELETE, NOTIFY
}

@Entity('permissions')
export default class Permission extends BaseEntity {

	@Column()
	slug: string

	@Column()
	description: string

	@Column({
		type: 'enum',
		enum: TypeProps
	})
	type: string

	@Column({
		type: 'enum',
		enum: ActionProps
	})
	action: string
}

