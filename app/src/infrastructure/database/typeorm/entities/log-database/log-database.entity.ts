import {
    Column,
    Entity
} from "typeorm";
import {BaseEntity} from "@infrastructure/database/typeorm/core/base-entity/base.entity";

@Entity("log_database",{schema:"log"})
export class LogDatabaseEntity extends BaseEntity{
    //adicione os campos da tabela aqui.
    @Column({comment:"tabela que foi movimentada no banco"})
    table!:string;

    @Column({name:'user_id',comment:"user_id que realizou a acao"})
    userId!: number;

    @Column({type:'text', comment:"dados que foram afetados."})
    data!: string;

}