import {
    Column,
    Entity,
    OneToMany,
} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {UsersEntity} from "@infrastructure/database/typeorm/entities/users/users.entity";

@Entity("users_login_types", {schema: 'icarus'})
export class UsersLoginTypesEntity extends BaseEntity {

    @Column({comment: 'nome do tipo de login'})
    name!: string;

    @OneToMany(
        () => UsersEntity,
        u => u.loginType
    )
    users!: UsersEntity[]
}
