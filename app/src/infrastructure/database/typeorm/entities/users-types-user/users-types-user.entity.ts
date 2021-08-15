import {
    Column,
    Entity, JoinColumn, ManyToOne,
} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {UsersEntity} from "@infrastructure/database/typeorm/entities/users/users.entity";
import {UsersTypesEntity} from "@infrastructure/database/typeorm/entities/users-types/users-types.entity";

@Entity("users_types_user",{schema:"auth"})
export class UsersTypesUserEntity extends BaseEntity {

    @ManyToOne(
        () => UsersEntity,
        u => u.id,
    )
    @JoinColumn({name: 'user_id'})
    user!: UsersEntity;

    @ManyToOne(
        () => UsersTypesEntity,
        tu => tu.id
    )
    @JoinColumn({name: 'user_type_id'})
    userType!: UsersTypesEntity;

    @Column({default:1})
    main!: string
}