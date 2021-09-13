import {IbaseRepository} from "@infrastructure/database/contracts/repository/ibase.repository";

export interface IUsersGroupsPermissionsRepository extends IbaseRepository {
    //registrar os metodos do repository aqui

    checkPermissionRouteByUser(userId: string, route?: string, action?: string): Promise<any>;
}