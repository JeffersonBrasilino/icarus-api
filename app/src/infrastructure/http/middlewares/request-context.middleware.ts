import {RequestContext} from "@core/request-context";

export function RequestContextMiddleware(req, res, next) {
    RequestContext.setRequestContext('curreq', req);
    next();
}
