import {Inject, Injectable} from "@nestjs/common";
import {ICompaniesRepository} from "@infrastructure/database/contracts/repository/Icompanies.repository";
import {BaseService} from "@core/base-application/base.service";

@Injectable()
export class CompaniesService extends BaseService{
    //injetar o(s) repositorio(s) ex: @Inject('IUsersRepository') private repo: IusersRepository
    constructor(@Inject('ICompaniesRepository') private repo: ICompaniesRepository) {
        super(repo);
    }

    async save(dados: any, id?: number) {
        try {
            const res = await this.saveAll(dados, id);
            if (res.id)
                return {status: id ? 'OK' : 'CREATED', data: {id: res.id}};
            else
                return {status: 'NOT_FOUND', data: 'registro não encontrado.'}

        } catch (e) {
            return {status: 'INTERNAL_SERVER_ERROR', data: 'houve um problema, tente novamente mais tarde.'}
        }
    }

    /*
    * exemplo de deleção com soft delete para registro filho.
    * o soft delete não funciona de maneira automatica para registros filhos, então é necessário
    * implementar manualmente.
    * */
    private async saveAll(data: any, id?: number) {
        if (id) {// quando for edição
            //busca a empresa com os setores;
            const company = await this.repo.getCompanyWithSectors(id);
            if (data?.companySectors) {
                //verifica quais vao ser removidos(soft-delete)
                company?.companySectors.map((val) => {
                    if (data?.companySectors.findIndex((dt) => dt.description == val.description) === -1) {
                        //soft-delete manual.
                        val.status = '0';
                        val.deletedAt = new Date();
                    }
                });

                //verifica qual vai ser adicionado
                data.companySectors.map((val) => {
                    if (company?.companySectors.findIndex((dt) => dt.description == val.description) === -1) {
                        company.companySectors.push(val);
                    }
                });

                //adiciona o valor do relacionamento filho aos dados para ser atualizado
                if (company?.companySectors)
                    data.companySectors = company.companySectors;
            }
        }

        return await this.repo.save(data, id);
    }

}