import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserLoginTypesDto {
    @ApiProperty({description:"Nome do tipo de login"})
    @IsNotEmpty()
    name: string;
}