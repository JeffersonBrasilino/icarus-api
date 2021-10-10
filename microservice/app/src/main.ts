import {NestFactory} from "@nestjs/core";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {AppModule} from "./app.module";
import {ValidationPipe,Logger} from "@nestjs/common";
import {ReceiveMessageExternalDeserializer} from "@infrastructure/nats/deserializers/receive-message-external.deserialize";
import {SendMessageExternalSerialize} from "@infrastructure/nats/serializers/send-message-external.serialize";
import {NatsCustomClient} from "@infrastructure/nats/client/nats-custom.client";

bootstrap();

async function bootstrap() {

    if(!process.env.APP_NATS_SERVER_HOST){
        throw new Logger().error('APP_NATS_SERVER_HOST variavel no .env não foi definido');
    }

    if(!process.env.APP_BASE_PATTERN_MESSAGE){
        throw new Logger().error('APP_BASE_PATTERN_MESSAGE variavel no .env não foi definido')
    }

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        //@ts-ignore
        transport: Transport.NATS,
        options: {
            queue: process.env.APP_NATS_SERVER_QUEUE ?? undefined,
            servers: [`nats://${process.env.APP_NATS_SERVER_HOST}`],
            deserializer: new ReceiveMessageExternalDeserializer(),
            serializer: new SendMessageExternalSerialize()
        },
        customClass: NatsCustomClient
    });


    /*VALIDACOES DO PAYLOAD*/
    app.useGlobalPipes(new ValidationPipe());
    await app.listen();

    new Logger().verbose(`${process.env.COMPOSE_PROJECT_NAME} iniciado.`)
}
