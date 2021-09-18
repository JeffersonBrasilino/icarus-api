import {Module} from "@nestjs/common";
import {UserRepositoryProvider, UsersGroupsPermissionsRepositoryProvider} from "@infrastructure/database/contracts";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import JwtSettings from "@infrastructure/http/settings/jwt.settings";
import {SendEmailProvider} from "@infrastructure/email";
import {UserController} from "@applications/auth/user/controller/user.controller";
import {UserService} from "@applications/auth/user/service/user.service";

@Module({
    imports: [
        PassportModule,
        JwtModule.register(JwtSettings)
    ],
    controllers: [UserController],
    providers: [UserService, UserRepositoryProvider, UsersGroupsPermissionsRepositoryProvider, SendEmailProvider],
    exports: [UserService]
})
export class UserModule {
}