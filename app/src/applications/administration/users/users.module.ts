import {Module} from "@nestjs/common";
import {UsersController} from "./controller/users.controller";
import {UsersService} from "./service/users.service";
import {TransactionProvider, UserRepositoryProvider} from "@infrastructure/database/contracts";

@Module({
    controllers: [UsersController],
    providers: [UsersService,UserRepositoryProvider,TransactionProvider],
    exports: [UsersService]
})
export class UsersModule {
}
