import {Inject, Injectable, Scope} from "@nestjs/common";
import {NatsBaseService} from "@core/base-application/nats-base.service";
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class LogsService extends NatsBaseService {
    //injetar o(s) repositorio(s) ex: @Inject('IUsersRepository') private repo: IusersRepository
    constructor(
        @Inject('NATS_CLIENT') private broker: ClientProxy
    ) {
        super(broker, 'logs');
    }

    registerLogRequest(dataRequest, credencialType, id, url, method) {
        this.broker.emit(`SAVE:${this.pattern}/request`, {
            data: dataRequest,
            credencialId: id,
            credencialType: credencialType,
            route: url,
            method: method
        }).subscribe();
    }

    registerLogTransaction(table: string, newData: any, oldData?: any) {
        this.broker.emit(`SAVE:${this.pattern}/transaction`, {
            table: table,
            newData: newData,
            oldData: oldData
        }).subscribe()
    }
}