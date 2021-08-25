import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Query, Req,
    Res
} from "@nestjs/common";
import {UserService} from "../service/user.service";
import {PublicRoute} from "@infrastructure/http/decorators/public-route";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SendCodeRecoveryPasswordDto} from "@applications/auth/user/dto/send-code-recovery-password.dto";
import {CheckCodeRecoveryPasswordDto} from "@applications/auth/user/dto/check-code-recovery-password.dto";
import {LoginDto} from "@applications/auth/user/dto/login.dto";

@ApiTags('auth')
@Controller('auth/user')
@ApiResponse(
    {
        status: 500,
        content: {
            json: {example: {status: 500, data: 'houve um problema, tente novamente mais tarde.'}},
        },
        description: 'Erro interno.',
    }
)
export class UserController {
    constructor(private _service: UserService) {
    }

    @PublicRoute()
    @Post('login')
    @ApiOperation({
        summary: 'Login de Usuário',
        description: "Realiza o login do usuário"
    })
    @ApiResponse(
        {
            status: 201,
            content: {
                json: {example: {status: 201, data: 'hash do token'}},
            },
            description: 'Quando o login for bem sucedido.',
        }
    )
    @ApiResponse(
        {
            status: 400,
            content: {
                json: {example: {status: 400, data: 'Usuário ou senha incorretas'}},
            },
            description: 'Quando o usuário ou a senha for incorretas.',
        }
    )
    async login(@Body() body: LoginDto, @Res({passthrough: true}) res, @Req() req) {
        const result = await this._service.login(body);
        res.status(HttpStatus[result.status]).json(result);
    }

    /*@PublicRoute()
    @Get('checkpermission')
    async getPermissionRouteByUser(@Query() param, @Res({passthrough: true}) res) {
        res.status(200).json(await this._service.getPermissionRouteByUser(param.userId));
    }*/

    @PublicRoute()
    @Post('send-code-recovery-password')
    @ApiOperation({
        summary: 'envia codigo de recuperar senha',
        description: "envia codigo via e-mail para verificação de recuperação de senha"
    })
    @ApiResponse(
        {
            status: 200,
            content: {
                json: {example: {status: 200, data: {userId: 'xxx'}}},
            },
            description: 'Enviado o codigo de verificação para o email com sucesso',
        }
    )
    @ApiResponse(
        {
            status: 400,
            content: {
                json: {example: {status: 400, data: 'usuario não encontrado'}},
            },
            description: 'Quando o usuario não for encontrado.',
        }
    )
    @ApiResponse(
        {
            status: 422,
            content: {
                json: {example: {status: 422, data: 'email inválido.'}},
            },
            description: 'Quando o email for inválido.',
        }
    )
    @ApiResponse(
        {
            status: 424,
            content: {
                json: {example: {status: 424, data: 'erro ao enviar email.'}},
            },
            description: 'Quando houver erro no envio de email',
        }
    )
    async sendVerificationCodetoEmailUser(@Body() body: SendCodeRecoveryPasswordDto, @Res({passthrough: true}) res) {
        const result = await this._service.sendVerificationCodetoEmailUser(body.username);
        res.status(HttpStatus[result.status]).json(result);
    }

    @PublicRoute()
    @Post('check-code-recovery-password')
    @ApiOperation({
        summary: 'validação do código de recuperar senha',
        description: "verifica o código de recuperação de senha enviado por e-mail"
    })
    @ApiResponse(
        {
            status: 200,
            content: {
                json: {example: {status: 200, data: {checked: true, userId: 'xxx'}}},
            },
            description: 'Quando houver erro no envio de email',
        }
    )
    @ApiResponse(
        {
            status: 404,
            content: {
                json: {example: {status: 404, data: 'Código de verifiação ou usuário incorreto.'}},
            },
            description: 'Quando houver erro no envio de email',
        }
    )
    async checkCodeRecoveryPassword(@Body() body: CheckCodeRecoveryPasswordDto, @Res({passthrough: true}) res) {
        const result = await this._service.checkCodeRecoveryPassword(body);
        res.status(HttpStatus[result.status]).json(result);
    }
}