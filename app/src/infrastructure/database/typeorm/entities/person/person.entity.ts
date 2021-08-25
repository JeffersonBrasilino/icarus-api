import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {PersonContactsEntity} from "@infrastructure/database/typeorm/entities/person-contacts/person-contacts.entity";
import {UsersEntity} from "@infrastructure/database/typeorm/entities/users/users.entity";

@Entity("person",{schema:'icarus'})
export class PersonEntity extends BaseEntity{

    @OneToMany(()=>PersonContactsEntity, pc=>pc.person)
    contacts!:PersonContactsEntity[]

    @OneToMany(()=>UsersEntity, u=>u.personId)
    users!: UsersEntity[];
}
