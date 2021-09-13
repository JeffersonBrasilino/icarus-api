import {BaseRepository} from "@infrastructure/database/typeorm/core/base-repository/base.repository";
import {ILogRequestRepository} from "@infrastructure/database/contracts/repository/Ilog-request.repository";
import {LogRequestEntity} from "@infrastructure/database/typeorm/entities/log-request/log-request.entity";
import {getRepository, IsNull, Not} from "typeorm";

export class LogRequestRepository extends BaseRepository<LogRequestEntity> implements ILogRequestRepository {
    constructor() {
        super(LogRequestEntity);
    }

    //adicionar metodos de consulta no banco aqui
}