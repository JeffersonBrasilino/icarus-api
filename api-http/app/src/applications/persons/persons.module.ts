import {Module} from "@nestjs/common";
import {PersonsController} from "./controller/persons.controller";
import {PersonsService} from "./service/persons.service";

//inportar o(s) provider(s) do(s) repositorio(s) aqui ex: UserRepositoryProvider
@Module({
    controllers: [PersonsController],
    providers: [PersonsService],
    exports: [PersonsService],
    imports:[]
})
export class PersonsModule {
}
