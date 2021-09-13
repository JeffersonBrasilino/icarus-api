import {Serializer} from "@nestjs/microservices";

export class SendMessageExternalSerialize implements Serializer {

    serialize(value: any) {
        return new TextEncoder().encode(JSON.stringify(value));
    }
}