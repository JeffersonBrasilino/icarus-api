import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {CompaniesEntity} from "@infrastructure/database/typeorm/entities/companies/companies.entity";

@Entity("companies_types",{schema:'icarus'})
export class CompaniesTypesEntity extends BaseEntity{
    @Column({comment:'descricao do tipo de empresa'})
    description!:string;

    @OneToMany(()=>CompaniesEntity, c=>c.companyType)
    companies!: CompaniesEntity[];
}
