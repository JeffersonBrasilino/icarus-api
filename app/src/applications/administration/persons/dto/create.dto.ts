import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateDto {
   //exemplo
    /*@ApiProperty({description:"Nome de usuário(usado para login em alguns casos)"})
    @IsNotEmpty()
    username: string;*/
}