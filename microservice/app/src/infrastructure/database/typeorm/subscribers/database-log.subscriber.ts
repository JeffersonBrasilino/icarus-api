import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    UpdateEvent
} from "typeorm";
import {Inject, Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {LogsService} from "@applications/logs/service/logs.service";

@EventSubscriber()
@Injectable()
export class DatabaseLogSubscriber implements EntitySubscriberInterface {

    constructor(@InjectConnection() private _db: Connection, private _log: LogsService) {
        _db.subscribers.push(this);
    }


    //tabelas que não precisam de auditoria.
    private EXCLUDE_TABLE = ['log_database', 'log_request'];

    afterUpdate(event: UpdateEvent<any>): Promise<any> | void {
        const {tableMetadataArgs} = event.metadata;
        if (this.EXCLUDE_TABLE.indexOf(tableMetadataArgs.name) === -1 && event.databaseEntity) {
            const {entity,databaseEntity} = event;
            this.registerLog(tableMetadataArgs.name, entity, databaseEntity);
        }
    }

    private registerLog(table: string, newData:object, oldData?: object) {
        try {
            if (process.env?.APP_PROD === 'PRODUCTION') {
                this._log.registerLogTransaction(table, newData, oldData);
            }

        } catch (e) {
            throw Error('problema ao registrar o log de alteração da tabela.');
        }
    }
}
