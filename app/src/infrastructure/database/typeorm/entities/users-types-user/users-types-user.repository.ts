import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {IusersTypesUserRepository} from "@infrastructure/database/contracts/repository/Iusers-types-user.repository";
import {UsersTypesUserEntity} from "@infrastructure/database/typeorm/entities/users-types-user/users-types-user.entity";

export class UsersTypesUserRepository extends BaseRepository<UsersTypesUserEntity> implements IusersTypesUserRepository {
    constructor() {
        super(UsersTypesUserEntity);
    }

    //adicionar metodos de consulta no banco aqui
}