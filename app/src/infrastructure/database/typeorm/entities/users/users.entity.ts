import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {UsersGroupsUserEntity} from "@infrastructure/database/typeorm/entities/users-groups-user/users-groups-user.entity";
import {UsersTypesUserEntity} from "@infrastructure/database/typeorm/entities/users-types-user/users-types-user.entity";
import {UsersLoginTypesEntity} from "@infrastructure/database/typeorm/entities/users-login-types/users-login-types.entity";

@Entity({name: 'users', schema: 'auth'})
export class UsersEntity extends BaseEntity {

    @Column({type: "varchar"})
    username!: string

    @Column({type: "varchar"})
    password!: string

    @Column({name: 'person_id', nullable: true})
    personId!: number

    @Column({name: 'verification_code', nullable: true})
    verificationCode!: string

    @OneToMany(
        () => UsersGroupsUserEntity,
        gpuu => gpuu.userGroup
    )
    usersGroup!: UsersGroupsUserEntity[]

    @OneToMany(
        () => UsersTypesUserEntity,
        utu => utu.userType
    )
    usersType!: UsersTypesUserEntity[]

    @ManyToOne(
        () => UsersLoginTypesEntity,
        utl => utl.users,
        {nullable: false}
    )
    @JoinColumn({name: 'users_login_type_id'})
    loginType!: UsersLoginTypesEntity;
}