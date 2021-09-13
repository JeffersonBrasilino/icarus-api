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

    findUserToRecoveryPassword(username: string): Promise<UsersEntity> {
        return this.baseRepository().findOne({
            //select: ['id'],
            join: {
                alias: 'user',
                innerJoinAndSelect: {
                    person: 'user.personId',
                    contacts: 'person.contacts',
                }
            },
            where: (qb) => {
                qb.where("person.status = '1'")
                    .andWhere("user.status = '1'")
                    .andWhere("contacts.main = '1'")
                    .andWhere("contacts.status = '1'")
                    .andWhere("(contacts.person_contact_type_id = '1' AND contacts.main = '1' )") //1 - email;
                    .andWhere('(user.username = :username OR user.password = :username)', {username});
            },
        })
    }

    checkVerificationCodeUserRecoveryPassword(userId: string, verificationCode: string): Promise<UsersEntity> {
        return this.baseRepository().findOne({
            select: ['id'],
            where: [
                {
                    id: userId,
                    status: 1,
                    verificationCode: verificationCode
                }
            ],
        })
    }
}