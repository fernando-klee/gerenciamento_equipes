import Role from '../../../../Authorizations/infra/typeorm/entities/Role'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import { Exclude } from 'class-transformer'

@Entity('users')
export default class User extends BaseEntity {
	@Column()
	name: string

	@Column()
	email: string

	@Column()
	status: boolean

	@Exclude()
	@Column()
	password: string

	@ManyToMany(() => Role)
	@JoinTable({
		name: 'users_roles',
		joinColumn: { name: 'user_id' },
		inverseJoinColumn: { name: 'role_id' }
	})
	roles?: Promise<Role[]>

}
