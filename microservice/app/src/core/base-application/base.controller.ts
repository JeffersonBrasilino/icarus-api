export abstract class BaseController {
    protected constructor(private _baseService) {
    }

    save(data: any, id?: number | string) {
        return this._baseService.save(data, id);
    }

    update(data: any, id: number | string) {
        return this._baseService.update(data, id);
    }

    list(query): Promise<any> {
        const page = query?.page ?? 1;
        delete query.page;
        return this._baseService.list(page, query);
    }

    get(id: number | string): Promise<any> {
        return this._baseService.get(id);
    }

    delete(id: number | string): Promise<any> {
        return this._baseService.delete(id);
    }
}