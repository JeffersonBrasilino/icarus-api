import {Module} from "@nestjs/common";
import {UsersModule} from "@applications/administration/users/users.module";
import {UsersGroupsModule} from "@applications/administration/users-groups/users-groups.module";
const MODULES = [
    UsersModule,
    UsersGroupsModule
]
@Module({
    imports:[...MODULES],
    exports: [...MODULES]
})
export class AdministrationModule {
}
