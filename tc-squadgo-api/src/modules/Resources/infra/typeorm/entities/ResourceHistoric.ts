import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Resource from './Resource'

export enum HistoricType {
	ADD_PROJECT,
	REMOVE_PROJECT,
	CHANGE_PROJECT_HOURS,
	NEW_FEEDBACK,
	NEW_FEEDBACK_RESOURCE,
	INCREASE_SKILL,
	DECREASE_SKILL,
	STATUS_CHANGED,
	TYPE_CHANGED,
	RESOURCE_CREATED,
	STATUS_INACTIVE,
	BECOME_RESPONSIBLE
}

export type HistoricTypeProps =
	'ADD_PROJECT' |
	'REMOVE_PROJECT' |
	'CHANGE_PROJECT_HOURS' |
	'NEW_FEEDBACK' |
	'NEW_FEEDBACK_RESOURCE' |
	'INCREASE_SKILL' |
	'DECREASE_SKILL' |
	'STATUS_CHANGED' |
	'TYPE_CHANGED' |
	'RESOURCE_CREATED' |
	'STATUS_INACTIVE' |
	'BECOME_RESPONSIBLE'

@Entity('resources_historic')
export default class ResourceHistoric extends BaseEntity {
	@Column()
	description: string

	@Column({
		type: 'enum',
		enum: HistoricType
	})
	type: string

	@Column()
	resource_id: number

	@ManyToOne(() => Resource)
	@JoinColumn({ name: 'resource_id' })
	resource: Resource
}
