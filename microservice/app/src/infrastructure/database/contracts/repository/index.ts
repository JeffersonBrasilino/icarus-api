import {Provider} from "@nestjs/common";
import {CompaniesRepository} from "@infrastructure/database/typeorm/entities/companies/companies.repository";
import {CompaniesSectorsRepository} from "@infrastructure/database/typeorm/entities/companies-sectors/companies-sectors.repository";
import {CompaniesGroupsRepository} from "@infrastructure/database/typeorm/entities/companies-groups/companies-groups.repository";
import {CompaniesTypesRepository} from "@infrastructure/database/typeorm/entities/companies-types/companies-types.repository";
export const CompaniesRepositoryProvider: Provider = {
    provide: 'ICompaniesRepository',
    useClass: CompaniesRepository
}

export const CompaniesSectorsRepositoryProvider: Provider = {
    provide: 'ICompaniesSectorsRepository',
    useClass: CompaniesSectorsRepository
}

export const CompaniesGroupsRepositoryProvider: Provider = {
    provide: 'ICompaniesGroupsRepository',
    useClass: CompaniesGroupsRepository
}

export const CompaniesTypesRepositoryProvider: Provider = {
    provide: 'ICompaniesTypesRepository',
    useClass: CompaniesTypesRepository
}
