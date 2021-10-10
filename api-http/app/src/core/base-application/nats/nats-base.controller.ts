import {Body, Param} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {catchError, lastValueFrom, Observable, of, take} from "rxjs";
import {ApiResponse} from "@nestjs/swagger";
@ApiResponse(
    {
        status: 500,
        content: {
            json: {example: {status: 500, data: 'houve um problema, tente novamente mais tarde.'}},
        },
        description: 'Erro interno.',
    }
)
export abstract class NatsBaseController {

    protected constructor(private broker: ClientProxy, private pattern: string) {
    }

    protected sendMessage(pattern: string, data?: any): Observable<any> {
        return this.broker.send(pattern, data ?? {})
            .pipe(
                take(1),
                catchError(err => {
                    return of(err);
                })
            );
    }

    async baseList(query) {
        try {
            return await lastValueFrom(this.sendMessage(`LIST:${this.pattern}`, query ?? {}));
        } catch (e) {
            return {
                status: 'INTERNAL_SERVER_ERROR',
                data: 'houve um problema, tente novamente mais tarde.'
            };
        }
    }

    async baseGet(@Param('id',) id: number) {
        try {
            return await lastValueFrom(this.sendMessage(`GET:${this.pattern}`, {id: id}));
        } catch (e) {
            return {
                status: 'INTERNAL_SERVER_ERROR',
                data: 'houve um problema, tente novamente mais tarde.'
            };
        }
    }

    async baseSave(@Body() saveDto: object, id?: number) {
        try {
            const dataSend = {data: saveDto};
            if(id)
                Object.assign(dataSend,{id:id});

            return await lastValueFrom(this.sendMessage(`SAVE:${this.pattern}`, dataSend));
        } catch (e) {
            return {
                status: 'INTERNAL_SERVER_ERROR',
                data: 'houve um problema, tente novamente mais tarde.'

            }
        }
    }

    async baseDelete(@Param('id') id: number) {
        try {
            return await lastValueFrom(this.sendMessage(`DELETE:${this.pattern}`, {id:id}));
        } catch (e) {
            return {
                status: 'INTERNAL_SERVER_ERROR',
                data: 'houve um problema, tente novamente mais tarde.'
            };
        }
    }
}
