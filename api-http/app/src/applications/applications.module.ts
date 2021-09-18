import {AuthModule} from "@applications/auth/auth.module";
import {Module} from "@nestjs/common";
import {PersonsModule} from "@applications/persons/persons.module";
import {LogsModule} from "@applications/logs/logs.module";

const MODULES = [
    AuthModule,
    PersonsModule,
    LogsModule
];

@Module({
    imports: [...MODULES],
    exports: [...MODULES]
})
export class ApplicationsModule {
}
