import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import jwtSettings from '@infrastructure/http/settings/jwt.settings'

@Injectable()
export class AuthRoutesStrategy extends PassportStrategy(Strategy,'auth-routes') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSettings.secret,
        });
    }

    async validate(payload: any) {
        return payload;
    }
}