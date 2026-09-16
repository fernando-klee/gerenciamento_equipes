import { Column, Entity } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'

@Entity('password_recover')
export default class PasswordRecover extends BaseEntity {

	@Column()
	user_id: number

	@Column()
	token: string
}
