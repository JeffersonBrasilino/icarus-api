import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {UsersEntity} from "@infrastructure/database/typeorm/entities/users/users.entity";
import {IusersRepository} from "@infrastructure/database/contracts/repository/Iusers.repository";

export class UsersRepository extends BaseRepository<UsersEntity> implements IusersRepository {
    // private readonly SALT_HASH = '$2b$10$fZmkl5xwQNZa1LsIGncBBu';
    constructor() {
        super(UsersEntity);
    }

    /*busca o usuario para login*/
    async getUserLogin(username: string): Promise<UsersEntity | any> {
        return await this.baseRepository().findOne({
            select: ['id', 'password'],
            where: {username: username, status: 1}
        });
    }
}