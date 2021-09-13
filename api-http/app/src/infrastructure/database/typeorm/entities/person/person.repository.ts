import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {IPersonRepository} from "@infrastructure/database/contracts/repository/Iperson.repository";
import {PersonEntity} from "@infrastructure/database/typeorm/entities/person/person.entity";
import {getRepository, IsNull, Not} from "typeorm";

export class PersonRepository extends BaseRepository<PersonEntity> implements IPersonRepository {
    constructor() {
        super(PersonEntity);
    }

    //adicionar metodos de consulta no banco aqui
}