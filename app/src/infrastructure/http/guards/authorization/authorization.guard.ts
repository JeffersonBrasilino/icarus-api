import {Injectable, CanActivate, ExecutionContext, Inject} from '@nestjs/common';
import {AuthorizationService} from "@infrastructure/http/guards/authorization/authorization.service";
import {IS_PUBLIC_KEY} from "@infrastructure/http/decorators/public-route";
import {Reflector} from "@nestjs/core";

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const {user, method, route, url, body, params} = context.switchToHttp().getRequest();
        if(process.env.APP_PROD === 'PRODUCTION'){
            const dataRequest = body ?? params ?? '';
            AuthorizationService.saveLogRequestApi(user.userId, url, method, dataRequest);
        }
        return await AuthorizationService.checkPermissionUser(user.userId, route.path, method);
    }
}