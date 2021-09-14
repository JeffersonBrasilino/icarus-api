import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {IApplicationsRepository} from "@infrastructure/database/contracts/repository/Iapplications.repository";
import {ApplicationsEntity} from "@infrastructure/database/typeorm/entities/applications/applications.entity";
import {getRepository, IsNull, Not, SelectQueryBuilder} from "typeorm";

export class ApplicationsRepository extends BaseRepository<ApplicationsEntity> implements IApplicationsRepository {
    constructor() {
        super(ApplicationsEntity);
    }

    getApplicationByPublicAndPrivateToken(applicationId: string, applicationToken: string):Promise<ApplicationsEntity> {
        return this.baseRepository().findOne({
            where: {publicKey: applicationId, privateKey: applicationToken}
        })
    }

    checkPermissionRouteByApplicationId(applicationId: string | number, route: string): Promise<any> {
        return this.baseRepository().find({
            join: {
                alias: 'app',
                innerJoinAndSelect: {
                    apiRoutesApplications: 'app.apiRoutesApplications',
                    application: 'apiRoutesApplications.application',
                    apiRoute: 'apiRoutesApplications.apiRoute'
                }
            },
            where: (qb: SelectQueryBuilder<any>) => {
                qb.where("apiRoutesApplications.status = '1'")
                    .andWhere("application.status = '1'")
                    .andWhere("apiRoute.status = '1'")
                    .andWhere('application.id = :applicationId', {applicationId})
                if (route)
                    qb.andWhere('apiRoute.route = :route', {route})
            }
        });
    }
}
