import {getRepository} from "typeorm";
import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {UsersGroupsEntity} from "@infrastructure/database/typeorm/entities/users-groups/users-groups.entity";
import {IusersGroupsRepository} from "@infrastructure/database/contracts/repository/Iusers-groups.repository";

export class UsersGroupsRepository extends BaseRepository<UsersGroupsEntity> implements IusersGroupsRepository {
    constructor() {
        super(UsersGroupsEntity);
    }

    async teste() {
        const res = await getRepository(this.entity).find();
        return res;
    }
}