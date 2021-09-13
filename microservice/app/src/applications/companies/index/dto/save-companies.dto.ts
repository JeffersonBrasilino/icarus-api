import {IsNotEmpty, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CompanySectorDTO {
    @ApiProperty()
    description: string
}


export class SaveCompaniesDto {
    //exemplo
    @ApiProperty({description: "Nome da empresa"})
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: "Id do grupo da empresa."})
    @IsNotEmpty()
    companyGroup: string;

    @ApiProperty({description: "Id do tipo da empresa."})
    @IsNotEmpty()
    companyType: string;

    @ApiProperty({description: "Nome abreviado da empresa", required: false})
    shortName: string;

    @ApiProperty({
        type: CompanySectorDTO,
        required: false,
        description: 'Setores que a empresa possui',
        isArray: true
    })
    companySector: CompanySectorDTO[]
}