import {IUsersGroupsPermissionsRepository} from "@infrastructure/database/contracts/repository/Iusers-groups-permissions.repository";
import {UsersGroupsPermissionsRepository} from "@infrastructure/database/typeorm/entities/users-groups-permissions/users-groups-permissions.repository";
import {LogRequestRepository} from "@infrastructure/database/typeorm/entities/log-request/log-request.repository";

export class AuthorizationService {
    static getInstanceRepository(): IUsersGroupsPermissionsRepository {
        return new UsersGroupsPermissionsRepository();
    }

    static async checkPermissionUser(userId: string, route: string, method: string) {
        const permissions = await this.getInstanceRepository().checkPermissionRouteByUser(userId, route, method);
        return permissions.length > 0;
    }

    static saveLogRequestApi(userId: string, route: string, method: string, data?: object) {
        const dataLog = {
            userId: userId,
            route: route,
            method: method,
            data: data
        } as object
        const logRequest = new LogRequestRepository();
        logRequest.save(dataLog);
    }
}