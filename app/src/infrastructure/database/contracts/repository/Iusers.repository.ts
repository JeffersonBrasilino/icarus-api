import {IbaseRepository} from "@infrastructure/database/contracts/repository/ibase.repository";
import {UsersEntity} from "@infrastructure/database/typeorm/entities/users/users.entity";

export interface IusersRepository extends IbaseRepository {
    //registrar os metodos do repository aqui
    getUserLogin(username: string): Promise<UsersEntity | any>
}