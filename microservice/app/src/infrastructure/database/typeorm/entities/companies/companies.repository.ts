import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {ICompaniesRepository} from "@infrastructure/database/contracts/repository/Icompanies.repository";
import {CompaniesEntity} from "@infrastructure/database/typeorm/entities/companies/companies.entity";

export class CompaniesRepository extends BaseRepository<CompaniesEntity> implements ICompaniesRepository {
    constructor() {
        super(CompaniesEntity);
    }

    async getCompanyWithSectors(id: number): Promise<CompaniesEntity> {
        return this.baseRepository().findOne({
            relations: ['companySectors'],
            where: {id: id}
        });
    }
}