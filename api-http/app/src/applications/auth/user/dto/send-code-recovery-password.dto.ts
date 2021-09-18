import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class SendCodeRecoveryPasswordDto {
    @ApiProperty({description: 'Usuário'})
    @IsNotEmpty()
    username: string
}