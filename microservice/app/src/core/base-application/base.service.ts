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
            return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
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
            return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
        }
    }

    async save(dados: any, id?: number) {
        try {
            const check = await this._baseRepo.get(id);
            if (check.length > 0) {
                const res = await this._baseRepo.save(dados, id);
                return {status: id ? 'OK' : 'CREATED', data: {id: res.id}};
            } else
                return {status: 'NOT_FOUND', data: 'registro não encontrado.'}
        } catch (e) {
            return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
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
            return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
        }
    }
}