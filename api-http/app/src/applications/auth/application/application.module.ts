import {Module} from "@nestjs/common";
import {ApplicationController} from "./controller/application.controller";
import {ApplicationService} from "./service/application.service";
import {ApplicationsRepositoryProvider} from "@infrastructure/database/contracts";
import {JwtModule} from "@nestjs/jwt";
import JwtSettings from "@infrastructure/http/settings/jwt.settings";

//inportar o(s) provider(s) do(s) repositorio(s) aqui ex: UserRepositoryProvider
@Module({
    controllers: [ApplicationController],
    imports:[JwtModule.register(JwtSettings)],
    providers: [ApplicationService, ApplicationsRepositoryProvider],
    exports: [ApplicationService]
})
export class ApplicationModule {
}
