import {IbaseRepository} from "@infrastructure/database/contracts/repository/ibase.repository";

export interface ICompaniesRepository extends IbaseRepository {
    getCompanyWithSectors(id: number);
}