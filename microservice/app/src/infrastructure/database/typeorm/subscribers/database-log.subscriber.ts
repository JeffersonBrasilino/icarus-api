import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber, getRepository, LoadEvent,
    UpdateEvent
} from "typeorm";
import {Inject, Injectable} from "@nestjs/common";
import {InjectConnection} from "@nestjs/typeorm";
import {MessageContext} from "@infrastructure/nats/context/message-context";
import {LogDatabaseEntity} from "@infrastructure/database/typeorm/entities/log-database/log-database.entity";
//TODO: TRANSFORMAR LOG EM SERVIÇO.
@EventSubscriber()
@Injectable()
export class DatabaseLogSubscriber implements EntitySubscriberInterface {

    constructor(@InjectConnection() private _db: Connection) {
        _db.subscribers.push(this);
    }

    //tabelas que não precisam de auditoria.
    private EXCLUDE_TABLE = ['log_database', 'log_requisition_api'];

    afterUpdate(event: UpdateEvent<any>): Promise<any> | void {
        const {tableMetadataArgs} = event.metadata;
        if (this.EXCLUDE_TABLE.indexOf(tableMetadataArgs.name) === -1 && event.databaseEntity) {
            DatabaseLogSubscriber.registerLog(tableMetadataArgs.name, event.databaseEntity);
        }
    }

    /*afterRemove(event: RemoveEvent<any>): Promise<any> | void {
        const {tableMetadataArgs} = event.metadata;
        if (this.EXCLUDE_TABLE.indexOf(tableMetadataArgs.name) === -1 && event.databaseEntity) {
            DatabaseLogSubscriber.registerLog('DELETE', event.databaseEntity);
        }
    }*/

    private static registerLog(table: string, oldData: string) {
        try {
            const userData = MessageContext.getContextByName('reqdata');
            if (process.env?.APP_PROD === 'PRODUCTION') {
                const data = {
                    table: table,
                    userId: userData.userId,
                    data: oldData
                }
                getRepository(LogDatabaseEntity).save(data);
            }
        } catch (e) {
            throw Error('problema ao registrar o log de alteração da tabela.');
        }
    }
}
