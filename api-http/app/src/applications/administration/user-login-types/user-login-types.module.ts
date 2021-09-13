import {Module} from "@nestjs/common";
import {UserLoginTypesController} from "./controller/user-login-types.controller";
import {UserLoginTypesService} from "./service/user-login-types.service";
import {UsersLoginTypesRepositoryProvider} from "@infrastructure/database/contracts";

//inportar o(s) provider(s) do(s) repositorio(s) aqui ex: UserRepositoryProvider
@Module({
    controllers: [UserLoginTypesController],
    providers: [UserLoginTypesService, UsersLoginTypesRepositoryProvider],
    exports: [UserLoginTypesService]
})
export class UserLoginTypesModule {
}
