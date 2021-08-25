import {Module} from "@nestjs/common";
import {UsersModule} from "@applications/administration/users/users.module";
import {UsersGroupsModule} from "@applications/administration/users-groups/users-groups.module";
import {PersonsModule} from "@applications/administration/persons/persons.module";
import {UserLoginTypesModule} from "@applications/administration/user-login-types/user-login-types.module";
const MODULES = [
    UsersModule,
    UsersGroupsModule,
    UserLoginTypesModule,
    PersonsModule
]
@Module({
    imports:[...MODULES],
    exports: [...MODULES]
})
export class AdministrationModule {
}
