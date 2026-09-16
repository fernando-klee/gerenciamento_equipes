import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import Resource from '../../../../Resources/infra/typeorm/entities/Resource'


export enum OneOnOneType {
    LEADER = 'LEADER',
    RESOURCE = 'RESOURCE'
}

@Entity('one_on_one')
export class OneOnOne {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    description: string

    @Column({
        type: 'enum',
        enum: OneOnOneType
    })
    type: OneOnOneType

    @Column({ name: 'leader_id' })
    leaderId: number

    @ManyToOne(() => Resource)
    @JoinColumn({ name: 'leader_id' })
    leader: Resource

    @Column({ name: 'resource_id' })
    resourceId: number

    @ManyToOne(() => Resource)
    @JoinColumn({ name: 'resource_id' })
    resource: Resource

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}
