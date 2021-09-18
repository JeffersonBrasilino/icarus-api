import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res} from "@nestjs/common";
import {PersonsService} from "../service/persons.service";
import {ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PublicRoute} from "@infrastructure/http/decorators/public-route";
import {ClientProxy, ClientProxyFactory, Transport} from "@nestjs/microservices";

@Controller('/persons')
export class PersonsController {
    con: ClientProxy;

    constructor(private _service: PersonsService) {
        this.con = ClientProxyFactory.create({
            transport: Transport.NATS,
            options: {
                servers: ['nats://lululove-nats'],
            }
        })
    }

    @Get()
    @PublicRoute({checkAppAuthorization: false})
    async list(@Query() query, @Res({passthrough: true}) res) {
        console.log('foi');
        this.con.send('vai','').subscribe(res=>console.log(res));
        res.status(200).json()
    }
}
