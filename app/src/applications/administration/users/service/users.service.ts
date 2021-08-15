import {Inject, Injectable} from "@nestjs/common";
import {IusersRepository} from "@infrastructure/database/contracts/repository/Iusers.repository";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(@Inject('IUsersRepository') private repo: IusersRepository) {
    }

    async list(page: number, filter?: object) {
        try {
            const res = await this.repo.list(page, filter);
            if (res.rows?.length > 0)
                return {status: 'OK', data: res};
            else
                return {status: 'NOT_FOUND', data: []}
        } catch (e) {
            return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
        }
    }

    async get(id: number) {
        try {
            const res = await this.repo.get(id);
            if (res.length > 0)
                return {status: 'OK', data: res[0]};
            else
                return {status: 'NOT_FOUND', data: []}
        } catch (e) {
            return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
        }
    }

    async save(dados: any, id?: number) {
        try {
            //gera a hash da senha.
            dados.password = bcrypt.hashSync(dados.password, 10);
            const res = await this.repo.save(dados, id);
            if (res.id)
                return {status: id ? 'OK' : 'CREATED', data: {id: res.id}};
            else
                return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
        } catch (e) {
            return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
        }
    }

    async delete(id: number) {
        try {
            const res = await this.repo.delete(id,false);
            if (res.affected > 0)
                return {status: 'OK', data: []};
            else
                return {status: 'NOT_FOUND', data: []}
        } catch (e) {
            return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
        }
    }

}