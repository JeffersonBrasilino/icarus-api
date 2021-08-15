import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {IusersTypesRepository} from "@infrastructure/database/contracts/repository/Iusers-types.repository";
import {UsersTypesEntity} from "@infrastructure/database/typeorm/entities/users-types/users-types.entity";

export class UsersTypesRepository extends BaseRepository<UsersTypesEntity> implements IusersTypesRepository {
    constructor() {
        super(UsersTypesEntity);
    }

    //adicionar metodos de consulta no banco aqui
}