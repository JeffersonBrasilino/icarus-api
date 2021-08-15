import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({description:"Nome de usuário(usado para login em alguns casos)"})
    @IsNotEmpty()
    username: string;

    @ApiProperty({description:"Senha para logar."})
    @IsNotEmpty()
    password: string;

    @ApiProperty({description:"pessoa ao qual pertence o login(pessoa_id)"})
    @IsNotEmpty()
    personId: string;

    @ApiProperty({description:"Tipo de usuario."})
    @IsNotEmpty()
    loginType: string;
}