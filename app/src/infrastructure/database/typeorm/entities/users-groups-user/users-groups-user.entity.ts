import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {UsersEntity} from "@infrastructure/database/typeorm/entities/users/users.entity";
import {UsersGroupsEntity} from "@infrastructure/database/typeorm/entities/users-groups/users-groups.entity";

@Entity({name: 'users_groups_user', schema: 'auth'})
export class UsersGroupsUserEntity extends BaseEntity {
    @PrimaryGeneratedColumn({type: "int8"})
    id!: number

    @Column({default:1})
    main!: string

    @ManyToOne(
        () => UsersEntity,
        u => u.id
    )
    @JoinColumn({name: 'user_id'})
    user!: UsersEntity

    @ManyToOne(
        () => UsersGroupsEntity,
        gpu => gpu.id
    )
    @JoinColumn({name: 'user_group_id'})
    userGroup!: UsersGroupsEntity
}