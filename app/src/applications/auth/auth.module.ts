
import {Module} from "@nestjs/common";
import {UserModule} from "@applications/auth/user/user.module";
import {ApplicationModule} from "@applications/auth/application/application.module";
const MODULES = [
    UserModule,
    ApplicationModule
]
@Module({
    imports:[...MODULES],
    exports: [...MODULES]
})
export class AuthModule {
}