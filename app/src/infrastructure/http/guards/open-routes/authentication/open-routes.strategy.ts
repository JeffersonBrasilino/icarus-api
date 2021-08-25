import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import jwtSettings from '@infrastructure/http/settings/jwt.settings'

@Injectable()
export class OpenRoutesStrategy extends PassportStrategy(Strategy,'open-routes') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('app-authorization'),
            ignoreExpiration: false,
            secretOrKey: jwtSettings.secret,
        });
    }

    async validate(payload: any) {
        return payload;
    }
}