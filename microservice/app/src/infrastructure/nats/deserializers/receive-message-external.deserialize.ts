import {Deserializer, WritePacket} from '@nestjs/microservices';
import {MessageContext} from "@infrastructure/nats/context/message-context";

/*
* classe deserializadora de respostas do NATS
* por que foi implementada?
* para que a mensagem seja igual a todos os serviços
* ENTÃO ESTA IMPLEMENTAÇÃO é para isto. ajudar a tratar o erro.
* sharingado de: https://dev.to/nestjs/integrate-nestjs-with-external-services-using-microservice-transporters-part-3-4m20*/
export class ReceiveMessageExternalDeserializer implements Deserializer {
    deserialize(value: any): WritePacket {
        if (value.toString()) {
            const valueJson = JSON.parse(value.toString());
            if (valueJson.reqdata) {
                MessageContext.setContext( 'reqdata', valueJson.reqdata);
            }
            return valueJson;
        } else {
            return {
                err: {status: 'SERVICE_UNAVAILABLE', data: 'erro ao se comunicar com o servico.'}
            }
        }
    }
}