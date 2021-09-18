
import {Module} from "@nestjs/common";
import {LogsModule} from "@applications/logs/logs.module";
const MODULES = [
    LogsModule
];

@Module({
    imports: [...MODULES],
    exports: [...MODULES]
})
export class ApplicationsModule {
}