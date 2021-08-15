import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {IApiRoutesRepository} from "@infrastructure/database/contracts/repository/Iapi-routes.repository";
import {ApiRoutesEntity} from "@infrastructure/database/typeorm/entities/api-routes/api-routes.entity";
import {getRepository, IsNull, Not} from "typeorm";

export class ApiRoutesRepository extends BaseRepository<ApiRoutesEntity> implements IApiRoutesRepository {
    constructor() {
        super(ApiRoutesEntity);
    }

    async getAllRoutes() {
        return await getRepository(this.entity).find({
            withDeleted: true
        });
    }
}