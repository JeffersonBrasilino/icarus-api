import { ApiResponse} from "@nestjs/swagger";
import { HttpStatus,} from "@nestjs/common";

@ApiResponse(
    {
        status: 500,
        content: {
            json: {example: {status: 500, data: 'houve um problema, tente novamente mais tarde.'}},
        },
        description: 'Erro interno.',
    }
)
export abstract class BaseController {
    protected constructor(private _baseService) {
    }

    async post(saveDto: object, res) {
        const result = await this._baseService.save(saveDto);
        res.status(HttpStatus[result.status]).json(result);
    }

    async put(saveDto: object, id: number, res) {
        const result = await this._baseService.save(saveDto, id);
        res.status(HttpStatus[result.status]).json(result);
    }

    async list(query, res) {
        const page = query.page ?? 1;
        delete query.page;
        const result = await this._baseService.list(query, page);
        res.status(HttpStatus[result.status]).json(result);
    }

    async get(id: number, res) {
        const result = await this._baseService.get(id);
        res.status(HttpStatus[result.status]).json(result);
    }

    async delete(id: number, res) {
        const result = await this._baseService.delete(id);
        res.status(HttpStatus[result.status]).json(result);
    }
}