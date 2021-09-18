import {NestExpressApplication} from "@nestjs/platform-express";
import {ApiRoutesRepository} from "@infrastructure/database/typeorm/entities/api-routes/api-routes.repository";
import {IApiRoutesRepository} from "@infrastructure/database/contracts/repository/Iapi-routes.repository";

export class SaveRoutesDatabase {
    private _repo: IApiRoutesRepository;

    constructor(private _app: NestExpressApplication) {
        this._repo = new ApiRoutesRepository();
    }

    async save() {
        console.log('salva rotas no banco...');
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
                    if (keyRota === -1) {
                        rotasSalvar.push({id: null, route: res.route.path, requireAuth: 1/*, apiRotasAcoes: []*/});
                    }
                    keyRota = rotasSalvar.findIndex(rt => rt.route === res.route.path);
                    if (rotaCadastradaKey !== -1) {
                        console.log('rota existente >> ', res.route.path);
                        //adiciona o id da rota cadastrada
                        rotasSalvar[keyRota].id = rotasCadastradas[rotaCadastradaKey].id;

                        /*
                        //busca todas as acoes cadastradas na rota
                        let acaoCadastrada = await this._rotasApiAcoesRepo.getActionByRotaIdAndAcao(rotasCadastradas[rotaCadastradaKey].id);


                        //caso cadastrada, verifica se houve alguma alteracao de subrotas
                        const acaoCadastradaKey = acaoCadastrada.findIndex(ac => ac.acao === acaoCadastrar);
                        if (acaoCadastradaKey === -1) {//caso for uma nova acao, adiciona no array da rota para cadatrar.
                            console.log('adicona nova acao>> ', acaoCadastrar);
                            rotasSalvar[keyRota].apiRotasAcoes.push({acao: acaoCadastrar});
                        } else {
                            const acaoId = acaoCadastrada[acaoCadastradaKey].id;
                            rotasSalvar[keyRota].apiRotasAcoes.push({
                                id: acaoId,
                                acao: acaoCadastrar
                            });
                            console.log('acao ja cadastrada >> ', acaoCadastrar+' id: '+ acaoId);
                        }
                        */

                    } else {
                        console.log('nova rota >> ', res.route.path);
                        //caso nao seja cadastrada, adicona no array de rotas a ser salva
                        //rotasSalvar[keyRota].apiRotasAcoes.push({acao: acaoCadastrar})
                    }
                }
            }
        })

        //verifica se houve alguma EXCLUSAO de rotas na aplicacao(conforme o banco)
        /*
        *ha um problema com o softDelete quando se usa relacoes
        * para adicionar, funciona perfeitamente, mas quando se trata de exclusaõ com SOFT DELETE o mesmo não exclui
        * (preencher o deleted_at dos filhos quando se chama a função de deletar via pai.
        * por conta disso, a delecao do filho foi feita de forma "manual".
        * para HARD DELETE funciona lindamente, basta adicionar a flag orphanedRowAction: 'delete'
        * */
        await Promise.all(
            rotasCadastradas.map(async rtc => {
                const rotaCadastradaKey = rotasSalvar.findIndex(rs => rs.route === rtc.route);
                if (rotaCadastradaKey === -1) {
                    console.log('deleta rota TOTAL>> ', rtc.route);
                    await this._repo.delete(rtc.id);
                } else {
                    if (rtc.deletedAt) {
                        console.log('restaura rota >> ', rtc.route);
                        await this._repo.restoreDeleted(rtc.id);
                        await this._repo.save({id:rtc.id, status:'1'});
                        //await this._rotasApiAcoesRepo.delete({apiRotasId: rtc.id});
                    }

                    /* const acaoCadastrada = await this._rotasApiAcoesRepo.getActionByRotaIdAndAcao(rtc.id);

                     acaoCadastrada.map(apiRotaAcao => {
                         //busca a acao cadastrada no array de acoes do controller
                         const acaoCadastradaId = rotasSalvar[rotaCadastradaKey].apiRotasAcoes.findIndex(rsa => rsa.acao === apiRotaAcao.acao);

                         if (acaoCadastradaId !== -1 && apiRotaAcao.deletedAt) {//se existir a acao a mesma estiver deletada, restaura
                             this._rotasApiAcoesRepo.restoreDeleted(apiRotaAcao.id);
                             console.log('restauara acao >> ',`${apiRotaAcao.acao} id: ${apiRotaAcao.id}`);

                         } else if (acaoCadastradaId === -1) {//caso a acao nao exista mais nos controllers, deleta do banco
                             this._rotasApiAcoesRepo.delete(apiRotaAcao.id);
                             console.log('deleta acao >> ',`${apiRotaAcao.acao} id: ${apiRotaAcao.id}`);
                         }

                         //adiciona o id da acao no array de salvar, para o orm não tentar "excluir" o registro existente.
                         rotasSalvar[rotaCadastradaKey].apiRotasAcoes.push({id: apiRotaAcao.id});
                     });*/
                }
            })
        );

        //salva todas as rotas NOVAS ou acoes NOVAS
        if (rotasSalvar.length !== 0) {
            await this._repo.save(rotasSalvar);
        }


        setTimeout(async () => {
            console.log('concluido.');
            await this._app.close();
        }, 2000)
    }
}