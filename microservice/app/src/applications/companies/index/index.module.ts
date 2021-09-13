import {Module} from "@nestjs/common";
import {CompaniesController} from "./controller/companies.controller";
import {CompaniesService} from "./service/companies.service";
import {CompaniesRepositoryProvider} from "@infrastructure/database/contracts";

//inportar o(s) provider(s) do(s) repositorio(s) aqui ex: UserRepositoryProvider
@Module({
    controllers: [CompaniesController],
    providers: [CompaniesService,CompaniesRepositoryProvider],
    exports: [CompaniesService]
})
export class IndexModule {
}
