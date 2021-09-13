import {
    Column,
    Entity,
    OneToMany
} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {CompaniesEntity} from "@infrastructure/database/typeorm/entities/companies/companies.entity";

@Entity("companies_groups",{schema:'icarus'})
export class CompaniesGroupsEntity extends BaseEntity{

    @Column({comment:'descricao do grupo de empresa'})
    description!:string;

    @OneToMany(()=>CompaniesEntity, c=>c.companyGroup)
    companies!: CompaniesEntity[];
}
