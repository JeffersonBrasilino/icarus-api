import {Module} from "@nestjs/common";
import {UsersGroupsController} from "./controller/users-groups.controller";
import {UsersGroupsService} from "./service/users-groups.service";
import {UsersGroupsRepositoryProvider} from "@infrastructure/database/contracts";

//inportar o(s) provider(s) do(s) repositorio(s) aqui ex: UserRepositoryProvider
@Module({
    controllers: [UsersGroupsController],
    providers: [UsersGroupsService, UsersGroupsRepositoryProvider],
    exports: [UsersGroupsService]
})
export class UsersGroupsModule {
}
