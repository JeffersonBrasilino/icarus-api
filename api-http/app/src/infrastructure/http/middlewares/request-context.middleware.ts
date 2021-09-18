import {RequestContext} from "@infrastructure/http/core/request-context";
import {JwtService} from "@nestjs/jwt";
import JwtSettings from "@infrastructure/http/settings/jwt.settings";

export function RequestContextMiddleware(req, res, next) {
    const {headers} = req;
    let requestData = {};
    if (headers?.authorization) {
        const token = (headers.authorization.replace(/[Bb]earer/, '')).trim();
        requestData = (new JwtService(JwtSettings)).decode(token) as object;
    }
    RequestContext.setRequestContext('curreq', requestData);
    next();
}
