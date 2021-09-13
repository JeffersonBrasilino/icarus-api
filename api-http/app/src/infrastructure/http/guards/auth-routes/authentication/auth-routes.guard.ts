import {ExecutionContext, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {Reflector} from "@nestjs/core";
import { PUBLIC_ROUTE} from "@infrastructure/http/decorators/public-route";

@Injectable()
export class AuthRoutesGuard extends AuthGuard('auth-routes') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<any>(PUBLIC_ROUTE, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic?.active === true) {
            return true;
        }
        return super.canActivate(context);
    }
}