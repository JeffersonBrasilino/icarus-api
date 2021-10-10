import {Module} from "@nestjs/common";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {SendMessageExternalSerialize} from "@infrastructure/nats/serializers/send-message-external.serialize";
import {ReceiveMessageExternalDeserializer} from "@infrastructure/nats/deserializers/receive-message-external.deserialize";
import {NatsCustomClient} from "@infrastructure/nats/client/nats-custom.client";
const CLIENT = ClientsModule.register(
    [
        {
            name: "NATS_CLIENT",
            transport: Transport.NATS,
            options: {
                servers: ['nats://'+process.env.APP_NATS_SERVER_HOST],
                serializer: new SendMessageExternalSerialize(),
                deserializer: new ReceiveMessageExternalDeserializer(),
                maxReconnectAttempts: -1 //max de tentativas de reconexao -1 = sem limite
            },
            //@ts-ignore
            customClass: NatsCustomClient
        }
    ]
)
@Module({
    imports:[CLIENT],
    exports:[CLIENT]
})
export class NatsClientModule{}