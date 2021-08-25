import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {IPersonContactsTypeRepository} from "@infrastructure/database/contracts/repository/Iperson-contacts-type.repository";
import {PersonContactsTypeEntity} from "@infrastructure/database/typeorm/entities/person-contacts-type/person-contacts-type.entity";
import {getRepository, IsNull, Not} from "typeorm";

export class PersonContactsTypeRepository extends BaseRepository<PersonContactsTypeEntity> implements IPersonContactsTypeRepository {
    constructor() {
        super(PersonContactsTypeEntity);
    }

    //adicionar metodos de consulta no banco aqui
}