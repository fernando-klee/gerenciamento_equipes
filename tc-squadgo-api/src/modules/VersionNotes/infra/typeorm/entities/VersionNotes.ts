import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'

@Entity('version_notes')
export default class VersionNotes extends BaseEntity {

	@Column()
	title: string

	@Column()
	link: string

	@Column()
	number: string

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
