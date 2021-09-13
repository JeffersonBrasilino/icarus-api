import {ClientNats, NatsOptions} from "@nestjs/microservices";

export class NatsCustomClient extends ClientNats{
    protected serializeError(err: any): any {
        return super.serializeError({status:'SERVICE_UNAVAILABLE',data: err.code});
    }

    protected serializeResponse(response: any): any {
        return super.serializeResponse(response);
    }

}