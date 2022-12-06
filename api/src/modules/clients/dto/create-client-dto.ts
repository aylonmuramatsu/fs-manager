import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { IsString, IsDate } from 'class-validator';

export class CreateClientDto {
  @ApiProperty()
  @IsString({ message: 'informe o nome.' })
  name: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  birthdate: Date;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value?.replace(/[^\d]/g, '').trim())
  rg: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value?.replace(/[^\d]/g, '').trim())
  cpf: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value?.replace(/[^\d]/g, '').trim())
  phone: string;
}
