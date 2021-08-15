import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Query,
    Res
} from "@nestjs/common";
import {AuthService} from "../service/auth.service";
import {PublicRoute} from "@infrastructure/http/decorators/public-route";
import {ApiTags} from "@nestjs/swagger";
import {LoginDto} from "@applications/auth/dto/login.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private _service: AuthService) {
    }

    @PublicRoute()
    @Post('login')
    async login(@Body() body: LoginDto, @Res({passthrough: true}) res) {
        const result = await this._service.login(body);
        res.status(HttpStatus[result.status]).json(result);
    }

    @PublicRoute()
    @Get('checkpermission')
    async getPermissionRouteByUser(@Query() param, @Res({passthrough: true}) res) {
        res.status(200).json(await this._service.getPermissionRouteByUser(param.userId));
    }
}