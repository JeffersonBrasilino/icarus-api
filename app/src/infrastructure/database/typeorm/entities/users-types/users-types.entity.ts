import {
    Column,
    Entity,
    OneToMany,
} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {UsersTypesUserEntity} from "@infrastructure/database/typeorm/entities/users-types-user/users-types-user.entity";

@Entity("users_types",{schema:"icarus"})
export class UsersTypesEntity extends BaseEntity {

    @Column({comment:'nome do tipo de usuario'})
    name!:string;

    @OneToMany(
        () => UsersTypesUserEntity,
        utu => utu.user
    )
    users!: UsersTypesUserEntity[]
}
