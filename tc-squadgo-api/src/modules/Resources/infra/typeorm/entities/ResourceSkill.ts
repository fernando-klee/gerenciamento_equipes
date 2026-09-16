import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from '../../../../../shared/infra/typeorm/entities/BaseEntity'
import Skill from '../../../../Skills/infra/typeorm/entities/Skill'
import Resource from './Resource'

@Entity('resources_skills')
export default class ResourceSkill extends BaseEntity {
    @Column()
    resource_id: number

    @ManyToOne(() => Resource)
    @JoinColumn({ name: 'resource_id' })
    resource: Resource

    @Column()
    skill_id: number

    @ManyToOne(() => Skill)
    @JoinColumn({ name: 'skill_id' })
    skill: Skill

    @Column()
    point: number
}