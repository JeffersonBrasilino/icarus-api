import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {IPersonContactsRepository} from "@infrastructure/database/contracts/repository/Iperson-contacts.repository";
import {PersonContactsEntity} from "@infrastructure/database/typeorm/entities/person-contacts/person-contacts.entity";
import {getRepository, IsNull, Not} from "typeorm";

export class PersonContactsRepository extends BaseRepository<PersonContactsEntity> implements IPersonContactsRepository {
    constructor() {
        super(PersonContactsEntity);
    }

    //adicionar metodos de consulta no banco aqui
}