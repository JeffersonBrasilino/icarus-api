import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {UsersGroupsUserEntity} from "@infrastructure/database/typeorm/entities/users-groups-user/users-groups-user.entity";
import {UsersGroupsPermissionsEntity} from "@infrastructure/database/typeorm/entities/users-groups-permissions/users-groups-permissions.entity";

@Entity({name: 'users_groups', schema: 'icarus'})
export class UsersGroupsEntity extends BaseEntity {

    @Column({type: "varchar"})
    name!: string


    @OneToMany(() => UsersGroupsUserEntity, gpuu => gpuu.userGroup)
    users!: UsersGroupsUserEntity[]

    @OneToMany(()=>UsersGroupsPermissionsEntity,ugpu=>ugpu.usersGroups)
    usersGoupsPermissions!: UsersGroupsPermissionsEntity[]
}
