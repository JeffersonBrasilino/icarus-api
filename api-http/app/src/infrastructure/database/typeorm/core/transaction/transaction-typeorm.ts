import {getConnection, QueryRunner} from "typeorm";
import {Itransaction} from "@infrastructure/database/contracts/transactions/itransaction";

export class TransactionTypeorm implements Itransaction {
    constructor() {
    }

    private _trans!: QueryRunner;

    async beginTrans() {
        console.log('begin trans');
        // get a connection and create a new query runner
        const connection = getConnection();
        this._trans = connection.createQueryRunner();
        await this._trans.connect();
        await this._trans.startTransaction();
        console.log(this._trans.isTransactionActive);
    }

    async commit() {
        console.log('commit');
        await this._trans.rollbackTransaction();
        console.log(this._trans.isTransactionActive);
    }

    async rollback() {
        console.log('rollback');
        await this._trans.rollbackTransaction();
        console.log(this._trans.isTransactionActive);
    }
}