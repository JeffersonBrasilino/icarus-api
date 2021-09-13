import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {ICompaniesTypesRepository} from "@infrastructure/database/contracts/repository/Icompanies-types.repository";
import {CompaniesTypesEntity} from "@infrastructure/database/typeorm/entities/companies-types/companies-types.entity";
import {getRepository, IsNull, Not} from "typeorm";

export class CompaniesTypesRepository extends BaseRepository<CompaniesTypesEntity> implements ICompaniesTypesRepository {
    constructor() {
        super(CompaniesTypesEntity);
    }

    //adicionar metodos de consulta no banco aqui
}