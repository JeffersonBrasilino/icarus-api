import {AuthModule} from "@applications/auth/auth.module";
import {Module} from "@nestjs/common";
import {AdministrationModule} from "@applications/administration/administration.module";

const MODULES = [
    AuthModule,
    AdministrationModule
];

@Module({
    imports: [...MODULES],
    exports: [...MODULES]
})
export class ApplicationsModule {
}