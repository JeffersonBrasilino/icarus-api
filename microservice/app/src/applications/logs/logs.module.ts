import {Module} from "@nestjs/common";
import {LogsService} from "./service/logs.service";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {SendMessageExternalSerialize} from "@infrastructure/nats/serializers/send-message-external.serialize";
import {ReceiveMessageExternalDeserializer} from "@infrastructure/nats/deserializers/receive-message-external.deserialize";
import {NatsCustomClient} from "@infrastructure/nats/client/nats-custom.client";

//inportar o(s) provider(s) do(s) repositorio(s) aqui ex: UserRepositoryProvider
@Module({
    providers: [LogsService],
    exports: [LogsService],
    imports: [ClientsModule.register(
        [
            {
                name: "LogsServiceNats",
                transport: Transport.NATS,
                options: {
                    queue:'teste_queue',
                    servers: [`nats://${process.env.APP_NATS_SERVER_HOST}`],
                    serializer: new SendMessageExternalSerialize(),
                    deserializer: new ReceiveMessageExternalDeserializer(),
                },
                //@ts-ignore
                customClass: NatsCustomClient
            }
        ]
    )]
})
export class LogsModule {
}
