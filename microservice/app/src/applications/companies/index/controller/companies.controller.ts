import {Ctx, MessagePattern, NatsContext, Payload, Transport} from "@nestjs/microservices";
import {CompaniesService} from "@applications/companies/index/service/companies.service";
import {Controller} from "@nestjs/common";
import {SaveCompaniesDto} from "@applications/companies/index/dto/save-companies.dto";
import {BaseController} from "@core/base-application/base.controller";

@Controller()
export class CompaniesController extends BaseController {
    private static BASE_PATTERN: string = 'companies/index';

    constructor(private _service: CompaniesService) {
        super(_service);
    }

    @MessagePattern(`LIST:${CompaniesController.BASE_PATTERN}`)
    async lista(@Payload() data: any, @Ctx() c:NatsContext): Promise<any> {
        const a = await super.list(data);
        return a;
    }

    @MessagePattern(`GET:${CompaniesController.BASE_PATTERN}`)
    async get(@Payload() data: any): Promise<any> {
        return await super.get(data);
    }

    @MessagePattern(`SAVE:${CompaniesController.BASE_PATTERN}`)
    async save(@Payload('data') data: SaveCompaniesDto, @Payload('id') id?: number | string) {
        return await super.save(data, id);
    }

    @MessagePattern(`DELETE:${CompaniesController.BASE_PATTERN}`)
    async delete(@Payload('id') id: number | string) {
        return await super.delete(id);
    }

}