import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SavePersonsDto {
   //exemplo
    /*@ApiProperty({description:"Nome de usuário(usado para login em alguns casos)"})
    @IsNotEmpty()
    username: string;*/
}