import {RequestContext} from "@infrastructure/http/core/request-context";

export function RequestContextMiddleware(req, res, next) {
    RequestContext.setRequestContext('curreq', req);
    next();
}
