import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {ICompaniesSectorsRepository} from "@infrastructure/database/contracts/repository/Icompanies-sectors.repository";
import {CompaniesSectorsEntity} from "@infrastructure/database/typeorm/entities/companies-sectors/companies-sectors.entity";
import {getRepository, IsNull, Not} from "typeorm";

export class CompaniesSectorsRepository extends BaseRepository<CompaniesSectorsEntity> implements ICompaniesSectorsRepository {
    constructor() {
        super(CompaniesSectorsEntity);
    }

    //adicionar metodos de consulta no banco aqui
}