import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {IusersLoginTypesRepository} from "@infrastructure/database/contracts/repository/Iusers-login-types.repository";
import {UsersLoginTypesEntity} from "@infrastructure/database/typeorm/entities/users-login-types/users-login-types.entity";

export class UsersLoginTypesRepository extends BaseRepository<UsersLoginTypesEntity> implements IusersLoginTypesRepository {
    constructor() {
        super(UsersLoginTypesEntity);
    }

    //adicionar metodos de consulta no banco aqui
}