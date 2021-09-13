import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {ICompaniesGroupsRepository} from "@infrastructure/database/contracts/repository/Icompanies-groups.repository";
import {CompaniesGroupsEntity} from "@infrastructure/database/typeorm/entities/companies-groups/companies-groups.entity";
import {getRepository, IsNull, Not} from "typeorm";

export class CompaniesGroupsRepository extends BaseRepository<CompaniesGroupsEntity> implements ICompaniesGroupsRepository {
    constructor() {
        super(CompaniesGroupsEntity);
    }

    //adicionar metodos de consulta no banco aqui
}