import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ApplicationsModule} from "@applications/applications.module";
import {TypeormConnection} from "@infrastructure/database/typeorm/connection/typeorm.connection";
import {DatabaseLogSubscriber} from "@infrastructure/database/typeorm/subscribers/database-log.subscriber";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {NatsResponseExceptionInterceptor} from "@infrastructure/nats/interceptors/nats-response-exception.interceptor";
import {NatsMessageContextInterceptor} from "@infrastructure/nats/interceptors/nats-message-context.interceptor";

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
        DatabaseLogSubscriber,
        {
            provide: APP_INTERCEPTOR,
            useClass: NatsMessageContextInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: NatsResponseExceptionInterceptor,
        },
    ],
})
export class AppModule{
}
