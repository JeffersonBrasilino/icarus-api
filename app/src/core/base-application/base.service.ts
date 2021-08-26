export abstract class BaseService {
    protected constructor(private _baseRepo) {
    }

    async list(page: number, filter?: object) {
        try {
            console.log('base service list')
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
            console.log('base service get')
            const res = await this._baseRepo.get(id);
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
            console.log('base service save')
            const res = await this._baseRepo.save(dados, id);
            if (res.id)
                return {status: id ? 'OK' : 'CREATED', data: {id: res.id}};
            else
                return {status: 'NOT_FOUND', data: 'registro não encontrado.'}
        } catch (e) {
            console.log(e);
            return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
        }
    }

    async delete(id: number) {
        try {
            console.log('base service delete')
            const res = await this._baseRepo.delete(id);
            if (res.affected > 0)
                return {status: 'OK', data: []};
            else
                return {status: 'NOT_FOUND', data: []}
        } catch (e) {
            return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
        }
    }
}