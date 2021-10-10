import {WritePacket, Deserializer} from '@nestjs/microservices';

/*
* classe deserializadora de respostas do NATS
* por que foi implementada?
* por que em alguns casos de erro de comunicação entre a origem/destino da mensagem o nats retornava
* um erro padrão, erro este que crashava a aplicação, sendo que o erro vinha direto do NATS.
* como o nest usa um deserializador "personalizado" o erro do nats não era interpretado corretamente
* dando a desgraça do erro de bad json.
* ENTÃO ESTA IMPLEMENTAÇÃO é para isto. ajudar a tratar o erro.
* sharingado de: https://dev.to/nestjs/integrate-nestjs-with-external-services-using-microservice-transporters-part-3-4m20*/
export class ReceiveMessageExternalDeserializer implements Deserializer {
    deserialize(value: any): WritePacket {
        if (value.toString()) {
            return JSON.parse(value.toString());
        } else {
            return {
                err: {status: 'SERVICE_UNAVAILABLE', data: 'erro ao se comunicar com o servico.'}
            }
        }
    }
}