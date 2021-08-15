import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import * as helmet from 'helmet';
import {NestExpressApplication} from "@nestjs/platform-express";
import {ValidationPipe} from "@nestjs/common";
import {JwtAuthGuard} from "@infrastructure/http/guards/authentication/jwt/jwt-auth.guard";
import {AuthorizationGuard} from "@infrastructure/http/guards/authorization/authorization.guard";
import {SwaggerGenerateDocumentation} from "@infrastructure/http/api-docs/swagger-generate.documentation";
import {SaveRoutesDatabase} from "@core/save-routes-database";
import {RequestContextMiddleware} from "@infrastructure/http/middlewares/request-context.middleware";

bootstrap();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bodyParser: true
    });

    app.use(helmet());

    /*VALIDACOES DO BODY*/
    app.useGlobalPipes(new ValidationPipe());

    /*GUARDAS DE ROTAS DE AUTORIZACAO E AUTENTICAÇÃO*/
    app.useGlobalGuards(
        new JwtAuthGuard(new Reflector()),
        new AuthorizationGuard(new Reflector())
    );

    //registra logs(somente producao)
    app.use(RequestContextMiddleware);


    /*SWAGGER*/
    new SwaggerGenerateDocumentation(app).generate();

    await app.listen(process.env.API_PORT ?? 3000);

    /*CLASSE EXCLUSIVA PARA SALVAR OTAS NO BANCO(COMANDO: npm run save-routes-bd)*/
    if (process.env.SAVE_ROUTES) {
        await (new SaveRoutesDatabase(app)).save();
    }

    console.log('rodando na porta ', process.env.API_PORT);
}
