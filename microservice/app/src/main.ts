import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {AppModule} from "./app.module";
import {ValidationPipe} from "@nestjs/common";
import {ReceiveMessageExternalDeserializer} from "@infrastructure/nats/deserializers/receive-message-external.deserialize";
import {SendMessageExternalSerialize} from "@infrastructure/nats/serializers/send-message-external.serialize";
import {NatsCustomClient} from "@infrastructure/nats/client/nats-custom.client";

bootstrap();

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        //@ts-ignore
        transport: Transport.NATS,
        options: {
            queue: 'companies_queue',
            servers: ['nats://icarus-nats'],
            deserializer: new ReceiveMessageExternalDeserializer(),
            serializer: new SendMessageExternalSerialize()
        },
        customClass: NatsCustomClient
    });


    /*VALIDACOES DO PAYLOAD*/
    app.useGlobalPipes(new ValidationPipe());
    await app.listen();
}
