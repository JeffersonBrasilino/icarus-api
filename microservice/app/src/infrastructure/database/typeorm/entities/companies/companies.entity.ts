import {
    Column,
    Entity, JoinColumn, ManyToOne, OneToMany,
} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {CompaniesGroupsEntity} from "@infrastructure/database/typeorm/entities/companies-groups/companies-groups.entity";
import {CompaniesTypesEntity} from "@infrastructure/database/typeorm/entities/companies-types/companies-types.entity";
import {CompaniesSectorsEntity} from "@infrastructure/database/typeorm/entities/companies-sectors/companies-sectors.entity";

@Entity("companies", {schema: 'icarus'})
export class CompaniesEntity extends BaseEntity {
    @Column({comment: 'nome da empresa'})
    name!: string;

    @Column({name: 'short_name', comment: 'nome abreviado da empresa', nullable: true})
    shortName!: string;

    @ManyToOne(() => CompaniesGroupsEntity, cg => cg.id)
    @JoinColumn({name: 'company_group_id'})
    companyGroup!: CompaniesGroupsEntity;

    @ManyToOne(() => CompaniesTypesEntity, ct => ct.id)
    @JoinColumn({name: 'company_type_id'})
    companyType!: CompaniesTypesEntity;

    @OneToMany(() => CompaniesSectorsEntity, cs => cs.company, {cascade: true, onDelete:'NO ACTION'})
    companySectors!: CompaniesSectorsEntity[];

}
