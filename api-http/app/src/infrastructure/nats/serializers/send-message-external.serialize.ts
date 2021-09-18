import {Serializer} from "@nestjs/microservices";
import {RequestContext} from "@infrastructure/http/core/request-context";

export class SendMessageExternalSerialize implements Serializer {

    serialize(value: any) {
        const userRequestData = RequestContext.currentRequestContext('curreq');
        value.data = Object.assign(value.data,{reqdata: userRequestData});
        return new TextEncoder().encode(JSON.stringify(value));
    }
}