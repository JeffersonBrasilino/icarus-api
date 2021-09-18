import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AuthorizeApplicationDto {
   //exemplo
    @ApiProperty({description:"chave publica disponibilizada no ato do cadastro do app"})
    @IsNotEmpty()
    applicationId: string;

    @ApiProperty({description:"chave PRIVADA disponibilizada no ato do cadastro do app (mantenha segura)"})
    @IsNotEmpty()
    applicationToken: string;
}