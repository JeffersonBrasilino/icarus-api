import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {IUsersGroupsPermissionsRepository} from "@infrastructure/database/contracts/repository/Iusers-groups-permissions.repository";
import {UsersGroupsPermissionsEntity} from "@infrastructure/database/typeorm/entities/users-groups-permissions/users-groups-permissions.entity";
import {SelectQueryBuilder} from "typeorm";

export class UsersGroupsPermissionsRepository extends BaseRepository<UsersGroupsPermissionsEntity> implements IUsersGroupsPermissionsRepository {
    constructor() {
        super(UsersGroupsPermissionsEntity);
    }

    //adicionar metodos de consulta no banco aqui
    checkPermissionRouteByUser(userId: string, route?: string, action?: string): Promise<any> {
        return this.baseRepository()
            .find(
                {
                    join: {
                        alias: 'ugp',
                        innerJoinAndSelect: {
                            apiRouteApplication: "ugp.apiRouteApplication",
                            application: 'apiRouteApplication.application',
                            apiRoute: 'apiRouteApplication.apiRoute'
                        },
                        innerJoin: {
                            usersGroups: 'ugp.usersGroups',
                            usersGroupsUser: 'usersGroups.users',
                            users: 'usersGroupsUser.user',
                        }
                    },
                    where: (qb: SelectQueryBuilder<any>) => {
                        qb.where("ugp.status = '1'")
                            .andWhere("usersGroups.status = '1'")
                            .andWhere("usersGroupsUser.status = '1'")
                            .andWhere("users.status = '1'")
                            .andWhere("apiRouteApplication.status = '1'")
                            .andWhere("application.status = '1'")
                            .andWhere("apiRoute.status = '1'")
                            .andWhere('users.id = :userId', {userId})

                        if (route)
                            qb.andWhere('apiRoute.route = :route', {route})

                        if (action)
                            qb.andWhere("upper(ugp.action) = upper(:action)",{action: action})
                    }
                }
            );
    }
}