import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {IApplicationsRepository} from "@infrastructure/database/contracts/repository/Iapplications.repository";
import {ApplicationsEntity} from "@infrastructure/database/typeorm/entities/applications/applications.entity";
import {getRepository, IsNull, Not} from "typeorm";

export class ApplicationsRepository extends BaseRepository<ApplicationsEntity> implements IApplicationsRepository {
    constructor() {
        super(ApplicationsEntity);
    }

    getApplicationByPublicAndPrivateToken(applicationId: string, applicationToken: string):Promise<ApplicationsEntity> {
        return this.baseRepository().findOne({
            where: {publicKey: applicationId, privateKey: applicationToken}
        })
    }
}