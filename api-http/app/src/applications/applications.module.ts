
import {Module} from "@nestjs/common";
import {TesteModule} from "@applications/teste/teste.module";
import {LogsModule} from "@applications/logs/logs.module";
const MODULES = [
    TesteModule,
    LogsModule
];

@Module({
    imports: [...MODULES],
    exports: [...MODULES]
})
export class ApplicationsModule {
}