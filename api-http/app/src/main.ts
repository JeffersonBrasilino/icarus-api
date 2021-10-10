import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as helmet from 'helmet';
import {NestExpressApplication} from "@nestjs/platform-express";
import {ValidationPipe} from "@nestjs/common";
import {SwaggerGenerateDocumentation} from "@infrastructure/http/api-docs/swagger-generate.documentation";
import {RequestContextMiddleware} from "@infrastructure/http/middlewares/request-context.middleware";
import {SaveRoutesDatabase} from "@infrastructure/http/core/save-routes-database";

bootstrap();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bodyParser: true
    });

    /*helmet*/
    app.use(helmet());

    /*CORS*/
    app.enableCors({
        origin: [
            /^(.*)/,
        ],
        methods: 'GET,PUT,POST,DELETE,OPTIONS',
        allowedHeaders:
            'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for,app-authorization',
    })

    /*VALIDACOES DO BODY*/
    app.useGlobalPipes(new ValidationPipe());

    //registra logs(somente producao)
    app.use(RequestContextMiddleware);


    /*SWAGGER*/
    const doc = new SwaggerGenerateDocumentation(app);
    doc.description = `<h4>Bem vindo!</h4>
                        <br>
                        <p>Esta é a documentação de uso das rotas da API do icarus. 
                        Há alguns pontos a se considerar antes de começar o uso. sendo esses:</p>
                        <ul>
                            <li><strong>TODA</strong> requisição que necessite de body, o mesmo <strong>DEVE</strong> ter o formato <strong>JSON</strong></li>
                            <li><strong>TODO</strong> retorno de requisição tem o tipo <strong>JSON</strong></li>
                            <li>A API suporta os verbos <strong>GET, POST, PUT, DELETE</strong></li>
                            <li>A API usa autenticação do tipo <strong>BEARER</strong>, ou seja, <strong>TODA ROTA AUTENTICADA</strong> deve conter o <strong>TOKEN</strong> de autenticação no <strong>CABEÇALHO DA REQUISIÇÃO</strong>.</li>
                            <li>O <strong>TOKEN</strong> é gerado a partir do <strong>LOGIN</strong> na api, e tem validade de <strong>8 HORAS</strong>.</li>
                            <li>Quando a rota não existir será retornado o <strong>código http 404</strong></li>
                            <li>Quando a rota for <strong>AUTENTICADA</strong> mas não possuir o <strong>TOKEN</strong> de autenticação, será retornado o <strong>código http 401</strong></li>
                            <li>Quanto a rota for <strong>AUTENTICADA</strong>, conter o token mas o usuário/aplicação não possuir credenciais, será retornado o <strong>código http 403</strong></li>
                            <li>
                                Para rotas <strong>abertas</strong>(rotas que não necessitam de autenticação de usuário) 
                                deverá ser enviado um cabeçalho <code>app-authorization</code>
                                com o token gerado pela rota <code>/auth/application/authorize</code>(rota que autoriza o app a fazer requisições para rotas abertas)
                            </li>
                        </ul>
`;
    doc.generate();

    await app.listen(process.env.API_PORT ?? 3000);
    /*CLASSE EXCLUSIVA PARA SALVAR OTAS NO BANCO(COMANDO: npm run save-routes-bd)*/

    if (process.env.SAVE_ROUTES) {
        await (new SaveRoutesDatabase(app)).save();
    }

    console.log('rodando na porta ', process.env.API_PORT);
}
