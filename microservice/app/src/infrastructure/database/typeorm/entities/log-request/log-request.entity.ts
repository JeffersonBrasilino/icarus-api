import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";

@Entity("log_request", {schema: 'log'})
export class LogRequestEntity extends BaseEntity {

    @Column({name: 'user_id', comment: 'user que realizou a requisição'})
    userId!: number;

    @Column({comment: 'rota da requisicao'})
    route!: string;

    @Column({comment: 'metodo da rota da requisicao'})
    method!: string;

    @Column({comment: 'dados que foram enviados', nullable: true, type: 'text'})
    data!: number;
}