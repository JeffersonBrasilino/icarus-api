import {Module} from "@nestjs/common";
import {AuthController} from "./controller/auth.controller";
import {AuthService} from "./service/auth.service";
import {UserRepositoryProvider, UsersGroupsPermissionsRepositoryProvider} from "@infrastructure/database/contracts";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import JwtSettings from "@infrastructure/http/settings/jwt.settings";

@Module({
    imports:[
        PassportModule,
        JwtModule.register(JwtSettings)
    ],
    controllers: [AuthController],
    providers: [AuthService,UserRepositoryProvider, UsersGroupsPermissionsRepositoryProvider],
    exports: [AuthService]
})
export class AuthModule {
}
