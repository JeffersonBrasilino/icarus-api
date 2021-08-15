import {Connection, createConnection, getConnection, getConnectionManager} from "typeorm";

export class TypeormConnection {
    static async connect(name?: string): Promise<Connection> {
        name = name ?? process.env.APP_DB_NAME ?? 'default';

        if (getConnectionManager().has(name)) {
            return getConnection();
        } else {
            return await createConnection(name);
        }
    }
}