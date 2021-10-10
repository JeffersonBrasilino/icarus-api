import {Injectable, CanActivate, ExecutionContext, Inject} from '@nestjs/common';
import {PUBLIC_ROUTE} from "@infrastructure/http/decorators/public-route";
import {Reflector} from "@nestjs/core";
//import {UserService} from "@applications/auth/user/service/user.service";
//import {ApplicationService} from "@applications/auth/application/service/application.service";
import {LogsService} from "@applications/logs/service/logs.service";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector,
                private authUserService: any,
                private authApplicationService: any,
                private logsService: LogsService
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<any>(PUBLIC_ROUTE, [
            context.getHandler(),
            context.getClass(),
        ]);

        const {user, method, route, url, body, params, headers} = context.switchToHttp().getRequest();
        const dataRequest = body ?? params ?? '';
        if (isPublic?.active === true) { //validação de rotas autenticadas por aplicação
            if (isPublic?.checkAppAuthorization === true) {
                this.saveLogRequest(dataRequest, 'APPLICATION', user.applicationId, url, method);
                //como para rotas autenticadas por aplicação usa a mesma strategia, os dados do token de app vão na chave user.
                return await this.authApplicationService.checkPermissionRouteAplication(user.applicationId, route.path);
            } else {
                return true;
            }
        } else { //validação de rotas autenticadas por usuario
            this.saveLogRequest(dataRequest, 'USER', user.userId, url, method);
            return await this.authUserService.getPermissionRouteByUser(user.userId, route.path, method);
        }
    }

    private saveLogRequest(dataRequest, credencialType, id, url, method) {
        if (process.env.APP_PROD === 'PRODUCTION') { //salvar log de requisição
            this.logsService.registerLogRequest(dataRequest, credencialType, id, url, method);
        }
    }
}