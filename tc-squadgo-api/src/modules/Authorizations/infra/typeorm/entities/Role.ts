import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Permission from './Permission'

@Entity('roles')
export default class Role extends BaseEntity {
	@Column()
	name: string

	@ManyToMany(() => Permission)
	@JoinTable({
		name: 'roles_permissions',
		joinColumn: { name: 'role_id' },
		inverseJoinColumn: { name: 'permission_id' }
	})
	permissions: Promise<Permission[]>
}
