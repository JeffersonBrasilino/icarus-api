
import {Module} from "@nestjs/common";
import {CompaniesModule} from "@applications/companies/companies.module";
const MODULES = [
    CompaniesModule
];

@Module({
    imports: [...MODULES],
    exports: [...MODULES]
})
export class ApplicationsModule {
}