import {IbaseRepository} from "@infrastructure/database/contracts/repository/ibase.repository";
import {getRepository} from "typeorm";
import {Repository} from "typeorm/repository/Repository";

export abstract class BaseRepository<T> implements IbaseRepository {
    protected constructor(protected entity) {
        if (!entity)
            throw Error('sem entidade no repositorio.')
    }

    protected baseRepository(): Repository<T> {
        return getRepository(this.entity);
    }

    public getPaginationParams(page: number, perPage?: number) {
        perPage = perPage ?? 10
        const pageNumber = (page - 1);
        const skip = perPage * pageNumber;
        return {take: perPage, skip: skip};
    }

    async list(page: number, filter?: object, _perPage?: number): Promise<any> {
        filter = filter ?? {}
        const {take: take, skip: skip} = this.getPaginationParams(page, _perPage);
        const countResult = await this.baseRepository().count({where: filter});
        const rows = await this.baseRepository().find({
            take: take,
            skip: skip,
            where: filter
        });
        return {rows: rows, total: countResult, perPage: take};
    }

    get(id: number): Promise<T | any> {
        return this.baseRepository().findByIds([id]);
    }


    async save(data: object, id?: number): Promise<T | any> {
        //id de edicao
        if (id) {
            Object.assign(data, {id: id});
        }
        return await this.baseRepository().save(data);
    }

    async delete(data: number | string | object, soft: boolean = true): Promise<any> {

        //atualiza status para disparar o subs de updated e salvar o log no banco.
        if (typeof data !== "object") {
            await this.baseRepository().save({id: data, status: '0'} as object);
        }

        if (soft === true) {
            return await this.baseRepository().softDelete(data);
        } else {
            return await this.baseRepository().delete(data);
        }
    }

    async restoreDeleted(data: number | object): Promise<T | any> {
        return await this.baseRepository().restore(data);
    }
}