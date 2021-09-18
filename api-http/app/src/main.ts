import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import * as helmet from 'helmet';
import {NestExpressApplication} from "@nestjs/platform-express";
import {ValidationPipe} from "@nestjs/common";
import {SwaggerGenerateDocumentation} from "@infrastructure/http/api-docs/swagger-generate.documentation";
import {RequestContextMiddleware} from "@infrastructure/http/middlewares/request-context.middleware";
import {OpenRoutesGuard} from "@infrastructure/http/guards/open-routes/authentication/open-routes.guard";
import {AuthRoutesGuard} from "@infrastructure/http/guards/auth-routes/authentication/auth-routes.guard";
import {AuthorizationGuard} from "@infrastructure/http/guards/auth-routes/authorization/authorization.guard";
import {SaveRoutesDatabase} from "@infrastructure/http/core/save-routes-database";

bootstrap();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bodyParser: true
    });

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
    new SwaggerGenerateDocumentation(app).generate();

    await app.listen(process.env.API_PORT ?? 3000);

    /*CLASSE EXCLUSIVA PARA SALVAR OTAS NO BANCO(COMANDO: npm run save-routes-bd)*/
    if (process.env.SAVE_ROUTES) {
        await (new SaveRoutesDatabase(app)).save();
    }

    console.log('rodando na porta ', process.env.API_PORT);
}
