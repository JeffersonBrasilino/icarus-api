import {IbaseRepository} from "@infrastructure/database/contracts/repository/ibase.repository";

export interface IusersRepository extends IbaseRepository {
    //registrar os metodos do repository aqui
    getUserLogin(username: string): Promise<any>;

    findUserToRecoveryPassword(username: string): Promise<any>;

    checkVerificationCodeUserRecoveryPassword(userId: string, verificationCode: string): Promise<any>;

}