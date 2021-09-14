import {IbaseRepository} from "@infrastructure/database/contracts/repository/ibase.repository";

export interface IApplicationsRepository extends IbaseRepository {
    getApplicationByPublicAndPrivateToken(applicationId: string, applicationToken: string);

    checkPermissionRouteByApplicationId(applicationId: string|number, route:string);
}
