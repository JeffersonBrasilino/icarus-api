import {Module} from "@nestjs/common";
import {IndexModule} from "@applications/companies/index/index.module";

const MODULES = [
    IndexModule,
   /* SectorsModule,
    GroupsModule,
    TypesModule*/
]

@Module({
    imports: [...MODULES],
    exports: [...MODULES]
})
export class CompaniesModule {
}
