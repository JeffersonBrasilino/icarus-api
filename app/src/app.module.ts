import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtStrategy} from "@infrastructure/http/guards/authentication/jwt/jwt.strategy";
import {ApplicationsModule} from "@applications/applications.module";
import {TypeormConnection} from "@infrastructure/database/typeorm/connection/typeorm.connection";

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
        JwtStrategy
    ],
})
export class AppModule{
}
