import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ApplicationsModule} from "@applications/applications.module";
import {TypeormConnection} from "@infrastructure/database/typeorm/connection/typeorm.connection";
import {DatabaseLogSubscriber} from "@infrastructure/database/typeorm/subscribers/database-log.subscriber";

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
        DatabaseLogSubscriber
    ],
})
export class AppModule{
}
