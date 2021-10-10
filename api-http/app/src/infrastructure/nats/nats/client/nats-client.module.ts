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
                servers: [`nats://${process.env.API_NATS_SERVER_HOST}`],
                serializer: new SendMessageExternalSerialize(),
                deserializer: new ReceiveMessageExternalDeserializer(),
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