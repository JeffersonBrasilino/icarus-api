export abstract class BaseService {
    protected constructor(private _baseRepo) {
    }

    async list(page: number, filter?: object) {
        try {
            const res = await this._baseRepo.list(page, filter);
            if (res.rows?.length > 0)
                return {status: 'OK', data: res};
            else
                return {status: 'NOT_FOUND', data: []}
        } catch (e) {
            throw {status: 'INTERNAL_SERVER_ERROR', err: e.toString()};
        }
    }

    async get(id: number) {
        try {
            const res = await this._baseRepo.get(id);
            if (res.length > 0)
                return {status: 'OK', data: res};
            else
                return {status: 'NOT_FOUND', data: []}
        } catch (e) {
            throw {status: 'INTERNAL_SERVER_ERROR', err: e.toString()};
        }
    }

    async save(dados: any, id?: number) {
        try {
            const res = await this._baseRepo.save(dados);
            return {status: 'CREATED', data: {id: res.id}};
        } catch (e) {
            throw {status: 'INTERNAL_SERVER_ERROR', err: e.toString()};
        }
    }

    async update(dados: any, id: number | string) {
        try {
            const check = await this._baseRepo.get(id);
            if (check.length > 0) {
                const res = await this._baseRepo.save(dados, id);
                return {status: 'OK', data: {id: res.id}};
            } else {
                return {status: 'NOT_FOUND', data: 'registro não encontrado.'}
            }
        } catch (e) {
            throw {status: 'INTERNAL_SERVER_ERROR', err: e.toString()};
        }
    }

    async delete(id: number) {
        try {
            const res = await this._baseRepo.get(id);
            if (res.length > 0) {
                await this._baseRepo.delete(id);
                return {status: 'OK', data: []};
            } else {
                return {status: 'NOT_FOUND', data: []}
            }
        } catch (e) {
            throw new Error(JSON.stringify({status: 'INTERNAL_SERVER_ERROR', err: e.toString()}));
        }
    }
}