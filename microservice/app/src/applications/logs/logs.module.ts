import {Module} from "@nestjs/common";
import {LogsService} from "./service/logs.service";
import {NatsClientModule} from "@infrastructure/nats/client/nats-client.module";

//inportar o(s) provider(s) do(s) repositorio(s) aqui ex: UserRepositoryProvider
@Module({
    providers: [LogsService],
    exports: [LogsService],
    imports: [NatsClientModule]
})
export class LogsModule {
}
