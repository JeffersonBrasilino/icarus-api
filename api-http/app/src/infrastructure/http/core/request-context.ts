import {getNamespace, createNamespace} from 'node-request-context';
import {JwtService} from "@nestjs/jwt";
import JwtSettings from "@infrastructure/http/settings/jwt.settings";

/*funcao responsável por salvar os dados da requisição para ser usado em outra camada, por exemplo:
* necessito salvar o user Id vindo da requisição em um log do banco de dados,
* como o banco "não sabe quem fez a requisição" esta funcção é justamenta para ajustar esse requisito.
* nada impede de ser usada em outro lugar(camada)*/
export class RequestContext {

    public static setRequestContext(name: string, value: any) {
        const namespace = getNamespace('icarus.dbnamespace') || createNamespace('icarus.dbnamespace');

        namespace.run(() => {
            namespace.set(name, value);
        });
    }

    public static currentRequestContext() {
        let namespace = getNamespace('icarus.dbnamespace');
        return namespace.get('curreq');
    }

    public static getUserDataByRequestToken(): any {
        let request = RequestContext.currentRequestContext();
        const {headers} = request;
        if (headers?.authorization) {
            const token = (headers.authorization.replace(/[Bb]earer/, '')).trim();
            return (new JwtService(JwtSettings)).decode(token);
        } else {
            //TODO: implementar para rotas abertas(se bem que não precisa...)
            return {origin: 'huehuebrbr'};
        }
    }
}
