import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeormConnection} from "@infrastructure/database/typeorm/connection/typeorm.connection";
import {OpenRoutesStrategy} from "@infrastructure/http/guards/open-routes/authentication/open-routes.strategy";
import {AuthRoutesStrategy} from "@infrastructure/http/guards/auth-routes/authentication/auth-routes.strategy";
import {ApplicationsModule} from "@applications/applications.module";
import {OpenRoutesGuard} from "@infrastructure/http/guards/open-routes/authentication/open-routes.guard";
import {AuthRoutesGuard} from "@infrastructure/http/guards/auth-routes/authentication/auth-routes.guard";
import {AuthorizationGuard} from "@infrastructure/http/guards/auth-routes/authorization/authorization.guard";

@Module({
    imports: [
        ApplicationsModule,
        TypeOrmModule.forRootAsync({
            useFactory: () =>({}),
            connectionFactory: async () => {
                return TypeormConnection.connect();
            }
        })
    ],
    controllers: [AppController],
    providers: [
        AppService,
        OpenRoutesStrategy,
        AuthRoutesStrategy,
        {
            provide: 'APP_GUARD',
            useClass: OpenRoutesGuard
        },
        {
            provide: 'APP_GUARD',
            useClass: AuthRoutesGuard
        },
        {
            provide: 'APP_GUARD',
            useClass: AuthorizationGuard
        }
    ],
})
export class AppModule{
}
