import {Provider} from "@nestjs/common";
import {TransactionTypeorm} from "@infrastructure/database/typeorm/core/transaction/transaction-typeorm";

export const TransactionProvider: Provider = {
    provide: 'ITransaction',
    useClass: TransactionTypeorm
}