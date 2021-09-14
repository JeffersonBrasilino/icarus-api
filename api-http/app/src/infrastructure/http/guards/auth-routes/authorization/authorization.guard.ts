import {Injectable, CanActivate, ExecutionContext, Inject} from '@nestjs/common';
import {AuthorizationService} from "@infrastructure/http/guards/auth-routes/authorization/authorization.service";
import {PUBLIC_ROUTE} from "@infrastructure/http/decorators/public-route";
import {Reflector} from "@nestjs/core";
import {UserService} from "@applications/auth/user/service/user.service";
import {ApplicationService} from "@applications/auth/application/service/application.service";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector,
                private authUserService: UserService,
                private authApplicationService: ApplicationService
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<any>(PUBLIC_ROUTE, [
            context.getHandler(),
            context.getClass(),
        ]);

        const {user, method, route, url, body, params, headers} = context.switchToHttp().getRequest();
        /* if (process.env.APP_PROD === 'PRODUCTION') { //salvar log de requisição
             const dataRequest = body ?? params ?? '';
             AuthorizationService.saveLogRequestApi(user.userId, url, method, dataRequest);
         }*/
        if (isPublic?.active === true) { //validação de rotas autenticadas por aplicação
            if (isPublic?.checkAppAuthorization === true) {
                //como para rotas autenticadas por aplicação usa a mesma strategia, os dados do token de app vão na chave user.
                return await this.authApplicationService.checkPermissionRouteAplication(user.applicationId, route.path);
            } else {
                return true;
            }
        } else { //validação de rotas autenticadas por usuario
            return await AuthorizationService.checkPermissionUser(user.userId, route.path, method);
        }
    }
}