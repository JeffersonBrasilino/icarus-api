import {
    EntitySubscriberInterface,
    EventSubscriber, getRepository,
    UpdateEvent
} from "typeorm";

import {LogDatabaseEntity} from "@infrastructure/database/typeorm/entities/log-database/log-database.entity";
import {RequestContext} from "@infrastructure/http/core/request-context";

@EventSubscriber()
export class DatabaseLogSubscriber implements EntitySubscriberInterface {
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
            if (process.env?.APP_PROD === 'PRODUCTION') {
               /* const userData = RequestContext.getUserDataByRequestToken();
                const data = {
                    table: table,
                    userId: userData.userId,
                    data: oldData
                }
                getRepository(LogDatabaseEntity).save(data);*/
            }
        } catch (e) {
            throw Error('problema ao registrar o log de alteração da tabela.');
        }
    }
}
