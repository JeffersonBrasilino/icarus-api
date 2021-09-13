import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CheckCodeRecoveryPasswordDto {
    @ApiProperty({description: 'usuário id'})
    @IsNotEmpty()
    userId: number;

    @ApiProperty({description: 'Código de verificação'})
    @IsNotEmpty()
    verificationCode: string;
}