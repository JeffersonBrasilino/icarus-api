export interface IbaseRepository {
    list(page: number, filter?: object, perPage?: number): Promise<any>;

    get(id: number): Promise<any>;

    save(data: object, id?: number): Promise<any>;

    delete(data: number | string | object, soft?: boolean): Promise<any>;

    restoreDeleted(data: number | object): Promise<any>;
}