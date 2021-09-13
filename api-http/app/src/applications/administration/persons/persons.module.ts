import {Module} from "@nestjs/common";
import {PersonsController} from "./controller/persons.controller";
import {PersonsService} from "./service/persons.service";
import {PersonRepositoryProvider} from "@infrastructure/database/contracts";

//inportar o(s) provider(s) do(s) repositorio(s) aqui ex: UserRepositoryProvider
@Module({
    controllers: [PersonsController],
    providers: [PersonsService,PersonRepositoryProvider],
    exports: [PersonsService]
})
export class PersonsModule {
}
