import {ClientProxy} from "@nestjs/microservices";
import {catchError, Observable, of, take} from "rxjs";

export abstract class NatsBaseService {

    protected constructor(private _broker: ClientProxy, protected pattern: string) {
    }

    protected sendMessage(pattern: string, data?: any): Observable<any> {
        return this._broker.send(pattern, data ?? {})
            .pipe(
                take(1),
                catchError(err => {
                    return of(err);
                })
            );
    }

    async list(filter?: object): Promise<any> {
        return new Promise<any>((resolve) => {
            try {
                this.sendMessage(`LIST:${this.pattern}`, filter ?? {})
                    .subscribe(res => {
                        resolve(res);
                    });
            } catch (e) {
                resolve({status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'});
            }
        });
    }

    async get(id: number) {
        return new Promise<any>((resolve) => {
            try {
                this.sendMessage(`GET:${this.pattern}`, id)
                    .subscribe(res => {
                        resolve(res);
                    });
            } catch (e) {
                resolve({status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'});
            }
        });
    }

    async save(dados: any, id?: number) {
        return new Promise<any>((resolve) => {
            try {
                this.sendMessage(`SAVE:${this.pattern}`, {data: dados, id: id})
                    .subscribe(res => {
                        resolve(res);
                    });
            } catch (e) {
                resolve({status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'});
            }
        });

    }

    async delete(id: number) {
        return new Promise<any>((resolve) => {
            try {
                this.sendMessage(`DELETE:${this.pattern}`, {id: id})
                    .subscribe(res => {
                        resolve(res);
                    });
            } catch (e) {
                resolve({status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'});
            }
        });
    }
}