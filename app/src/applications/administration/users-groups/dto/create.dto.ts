import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateDto {
   //exemplo
    @ApiProperty({description:"Nome do grupo"})
    @IsNotEmpty()
    name: string;
}