import {
    Column,
    Entity, JoinColumn, ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {CompaniesEntity} from "@infrastructure/database/typeorm/entities/companies/companies.entity";

@Entity("companies_sectors", {schema: 'icarus'})
export class CompaniesSectorsEntity extends BaseEntity {

    @Column({comment: 'nome do setor'})
    description!: string;

    @ManyToOne(() => CompaniesEntity, c => c.id, {nullable: false})
    @JoinColumn({name: 'company_id'})
    company!: CompaniesEntity;
}
