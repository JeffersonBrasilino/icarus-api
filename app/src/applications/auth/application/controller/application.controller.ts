import {Body, Controller, HttpStatus, Post, Req, Res} from "@nestjs/common";
import {ApplicationService} from "../service/application.service";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PublicRoute} from "@infrastructure/http/decorators/public-route";
import {AuthorizeApplicationDto} from "@applications/auth/application/dto/authorize-application.dto";

@ApiTags('auth')
@Controller('auth/application')
@ApiResponse(
    {
        status: 500,
        content: {
            json: {example: {status: 500, data: 'houve um problema, tente novamente mais tarde.'}},
        },
        description: 'Erro interno.',
    }
)
export class ApplicationController {
    constructor(private _service: ApplicationService) {
    }

    @PublicRoute({checkAppAuthorization: false})
    @Post('authorize')
    @ApiOperation({
        summary: 'Autorização de aplicação',
        description: "Autoriza a aplicação a fazer requisições em rotas abertas."
    })
    @ApiResponse(
        {
            status: 200,
            content: {
                json: {example: {status: 200, data: 'hash do token'}},
            },
            description: 'Quando a autorização for bem sucedida.',
        }
    )
    @ApiResponse(
        {
            status: 400,
            content: {
                json: {example: {status: 400, data: 'credenciais de aplicação incorreta'}},
            },
            description: 'Quando as credenciais de aplicação estiverem incorretas.',
        }
    )
    async authorizeApplication(@Body() body: AuthorizeApplicationDto, @Res({passthrough: true}) res) {
        const result = await this._service.authorizeApplication(body);
        res.status(HttpStatus[result.status]).json(result);
    }

}