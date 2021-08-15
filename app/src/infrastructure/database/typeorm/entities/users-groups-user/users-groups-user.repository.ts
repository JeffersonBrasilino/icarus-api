import {getRepository} from "typeorm";
import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {UsersGroupsUserEntity} from "@infrastructure/database/typeorm/entities/users-groups-user/users-groups-user.entity";
import {IusersGroupsUserRepository} from "@infrastructure/database/contracts/repository/Iusers-groups-user.repository";

export class UsersGroupsUserRepository extends BaseRepository<UsersGroupsUserEntity> implements IusersGroupsUserRepository {
    constructor() {
        super(UsersGroupsUserEntity);
    }

    async teste() {
        const res = await getRepository(this.entity).find();
        return res;
    }
}