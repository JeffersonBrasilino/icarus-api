import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {IApiRoutesApplicationsRepository} from "@infrastructure/database/contracts/repository/Iapi-routes-applications.repository";
import {ApiRoutesApplicationsEntity} from "@infrastructure/database/typeorm/entities/api-routes-applications/api-routes-applications.entity";
import {getRepository, IsNull, Not} from "typeorm";

export class ApiRoutesApplicationsRepository extends BaseRepository<ApiRoutesApplicationsEntity> implements IApiRoutesApplicationsRepository {
    constructor() {
        super(ApiRoutesApplicationsEntity);
    }

    //adicionar metodos de consulta no banco aqui
}