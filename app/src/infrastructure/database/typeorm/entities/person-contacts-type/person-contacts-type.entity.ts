import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {PersonContactsEntity} from "@infrastructure/database/typeorm/entities/person-contacts/person-contacts.entity";

@Entity("person_contacts_type", {schema: 'icarus'})
export class PersonContactsTypeEntity extends BaseEntity {
    @OneToMany(() => PersonContactsEntity, pc => pc.personContactType)
    contacts!: PersonContactsEntity[]

    @Column({comment:'nome do tipo de contato'})
    description!: string;
}
