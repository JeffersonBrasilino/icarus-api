import {SetMetadata} from '@nestjs/common';

/*export const PUBLIC_ROUTE = 'isPublic';
export const PublicRoute = () => SetMetadata(PUBLIC_ROUTE, true);*/
interface PublicRouteOptions {
    checkAppAuthorization: boolean
}

export const PUBLIC_ROUTE = {checkAppAuthorization: true, active: true};
export const PublicRoute = (options?: PublicRouteOptions) => {
    return SetMetadata(PUBLIC_ROUTE, {checkAppAuthorization: options?.checkAppAuthorization ?? true, active: true});
};