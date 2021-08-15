import {
    Column,
    Entity,
    OneToMany
} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";
import {ApiRoutesApplicationsEntity} from "@infrastructure/database/typeorm/entities/api-routes-applications/api-routes-applications.entity";

@Entity("api_routes",{schema:'auth'})
export class ApiRoutesEntity extends BaseEntity {

    //adicione os campos da tabela aqui.
    @Column({comment: 'rota da api'})
    route!: string;

    @OneToMany(() => ApiRoutesApplicationsEntity, ara => ara.apiRoute)
    applications!: ApiRoutesApplicationsEntity[]
}