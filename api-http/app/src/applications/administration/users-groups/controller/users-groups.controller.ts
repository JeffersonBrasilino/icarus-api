import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res} from "@nestjs/common";
import {UsersGroupsService} from "../service/users-groups.service";
import {CreateDto} from "@applications/administration/users-groups/dto/create.dto";
import {ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('administration')
@Controller('administration/users-groups')
@ApiBearerAuth()
export class UsersGroupsController {
    constructor(private _service: UsersGroupsService) {
    }

    @ApiOperation({
        summary: 'Listagem',
        description: "Lista todos os registros com paginação, caso necesside de filtros, passar um objeto com campos da tabela e valor que irá filtrar."
    })
    @ApiQuery({name: 'page', description: 'numero da pagina(paginacao)', required: false})
    @Get()
    async list(@Query() query, @Res({passthrough: true}) res) {
        const page = query.page ?? 1;
        delete query.page;
        const result = await this._service.list(page, query);
        res.status(HttpStatus[result.status]).json(result);
    }

    @ApiOperation({
        summary: 'retonar registro conforme ID',
        description: "retorna o registro conforme o id"
    })
    @ApiParam({name: 'id', description: 'ID a ser consultado'})
    @Get(':id')
    async get(@Param('id',) id: number, @Res({passthrough: true}) res) {
        const result = await this._service.get(id);
        res.status(HttpStatus[result.status]).json(result);
    }

    @ApiOperation({
        summary: 'Salva o registro',
        description: "salva o registro(cadastro) conforme a entidade e a entrada dos dados."
    })
    @Post()
    async post(@Body() createDto: CreateDto, @Res({passthrough: true}) res) {
        const result = await this._service.save(createDto);
        res.status(HttpStatus[result.status]).json(result);
    }

    @ApiOperation({
        summary: 'Atualiza o registro',
        description: "Atualiza o registro(cadastro) conforme a entidade e a entrada dos dados.",
    })
    @Put(':id')
    async put(@Body() createDto: CreateDto, @Param('id') id: number, @Res({passthrough: true}) res) {
        const result = await this._service.save(createDto, id);
        res.status(HttpStatus[result.status]).json(result);
    }

    @ApiOperation({
        summary: 'Deleta o registro',
        description: "DELETA o registro(soft-delete)"
    })
    @Delete(':id')
    async delete(@Param('id') id: number, @Res({passthrough: true}) res) {
        const result = await this._service.delete(id);
        res.status(HttpStatus[result.status]).json(result);
    }
}