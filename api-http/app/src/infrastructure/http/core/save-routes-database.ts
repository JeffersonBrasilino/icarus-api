import {NestExpressApplication} from "@nestjs/platform-express";
import {ApiRoutesRepository} from "@infrastructure/database/typeorm/entities/api-routes/api-routes.repository";
import {IApiRoutesRepository} from "@infrastructure/database/contracts/repository/Iapi-routes.repository";
import {Client, ClientProxy, ClientsModule, Transport} from "@nestjs/microservices";
import {SendMessageExternalSerialize} from "@infrastructure/nats/serializers/send-message-external.serialize";
import {ReceiveMessageExternalDeserializer} from "@infrastructure/nats/deserializers/receive-message-external.deserialize";
import {NatsCustomClient} from "@infrastructure/nats/client/nats-custom.client";
import {ClientProxyFactory} from '@nestjs/microservices';

export class SaveRoutesDatabase {
    private _repo: IApiRoutesRepository;
    private natsClient: ClientProxy;

    constructor(private _app: NestExpressApplication) {
        this._repo = new ApiRoutesRepository();

        this.natsClient = ClientProxyFactory.create({

            //@ts-ignore
            transport: Transport.NATS,
            options: {
                servers: ['nats://' + process.env.API_NATS_SERVER_HOST],
                serializer: new SendMessageExternalSerialize(),
                deserializer: new ReceiveMessageExternalDeserializer(),
                maxReconnectAttempts: -1 //max de tentativas de reconexao -1 = sem limite
            },
            //@ts-ignore
            customClass: NatsCustomClient
        })
    }

    async save() {
        console.log('salvando novas rotas, AGUARDE...');
        //rotas que não serão analisadas para serem salvas
        const excludedRoutes = ['/', '/docs', '/docs-json'];
        //busca todas as rotas cadastradas no banco
        const rotasCadastradas = await this._repo.getAllRoutes();
        //array de rotas a ser salvas
        let rotasSalvar = [];
        //percorre todas as rotas registradas no aplicativo
        this._app.getHttpServer()._events.request._router.stack.map(async (res) => {
            if (res?.route) {
                if (excludedRoutes.indexOf(res.route.path) === -1) {
                    //verifica se a rota ja foi cadastrada no banco
                    const rotaCadastradaKey = rotasCadastradas.findIndex(rtc => rtc.route === res.route.path);

                    //pega a acao da rota
                    // const acaoCadastrar = Object.keys(res.route.methods)[0];

                    //verifica se a rota ja foi adicionada(pois quando a mesma rota tem mais de uma acao, ela vem repetida)

                    let keyRota = rotasSalvar.findIndex(rt => rt.route === res.route.path);
                    if (keyRota === -1 && rotaCadastradaKey == -1) {
                        const rgx = new RegExp(/^.*(\/:id)$/);
                        const isIdParam = res.route.path.match(rgx);
                        let permissions = [
                            {
                                usersGroups: {id: "1"},
                                action: "POST"
                            },
                            {
                                usersGroups: {id: "1"},
                                action: "GET"
                            }
                        ];
                        if (isIdParam) {
                            permissions = [
                                {
                                    usersGroups: {id: "1"},
                                    action: "GET"
                                },
                                {
                                    usersGroups: {id: "1"},
                                    action: "PUT"
                                },
                                {
                                    usersGroups: {id: "1"},
                                    action: "DELETE"
                                }
                            ]
                        }

                        rotasSalvar.push({
                            route: res.route.path, applications: [
                                {
                                    application: {
                                        id: "1"
                                    },
                                    userGroupsPermissions: permissions
                                }
                            ]
                        });
                    }
                }
            }
        })

        if (rotasSalvar.length !== 0) {
            rotasSalvar.map(rs => {
                this.natsClient.send('SAVE:administration/api-routes', {data: rs}).subscribe(res => console.log(res))
            })
            //await this._repo.save(rotasSalvar);
        }
        //salva todas as rotas NOVAS ou acoes NOVAS


        setTimeout(async () => {
            console.log('concluido.');
            await this._app.close();
        }, 2000)
    }
}