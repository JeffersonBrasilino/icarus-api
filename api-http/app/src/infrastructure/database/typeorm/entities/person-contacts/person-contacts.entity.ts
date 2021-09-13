import {
    Column,
    Entity, JoinColumn, ManyToOne,
} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {PersonContactsTypeEntity} from "@infrastructure/database/typeorm/entities/person-contacts-type/person-contacts-type.entity";
import {PersonEntity} from "@infrastructure/database/typeorm/entities/person/person.entity";

@Entity("person_contacts", {schema: 'icarus'})
export class PersonContactsEntity extends BaseEntity {
    @ManyToOne(() => PersonEntity, p => p.id)
    @JoinColumn({name: 'person_id'})
    person!: PersonEntity;

    @ManyToOne(() => PersonContactsTypeEntity, pct => pct.id)
    @JoinColumn({name: 'person_contact_type_id'})
    personContactType!: PersonContactsTypeEntity;

    @Column()
    description!: string;

    @Column({type: 'char', length: 1, comment:'chave verificadora do contato principal(pode ter somente um por tipo)'})
    main: string;
}
