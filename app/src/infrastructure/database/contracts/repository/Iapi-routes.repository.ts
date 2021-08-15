import {IbaseRepository} from "@infrastructure/database/contracts/repository/ibase.repository";

export interface IApiRoutesRepository extends IbaseRepository {
    //registrar os metodos do repository aqui
    getAllRoutes();
}