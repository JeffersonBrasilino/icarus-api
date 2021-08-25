import {Connection, createConnection, getConnection, getConnectionManager} from "typeorm";

export class TypeormConnection {
    private static CONNECTION_NAME = process.env.APP_DB_CONNECTION_NAME ?? 'default';

    static async connect(name?: string): Promise<Connection> {
        name = name ?? this.CONNECTION_NAME;
        this.CONNECTION_NAME = name ?? this.CONNECTION_NAME;
        if (!getConnectionManager().has(this.CONNECTION_NAME)) {
            return await createConnection(this.CONNECTION_NAME);
        }
    }

    static getConnection(): Connection {
        return getConnection(this.CONNECTION_NAME);
    }
}