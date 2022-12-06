import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class EditAddressDto {
  @ApiProperty()
  @IsString({ message: 'informe o cep.' })
  @Transform(({ value }) => value?.replace(/[^\d]/g, '').trim())
  zipcode: string;

  @ApiProperty()
  @IsString({ message: 'informe o endereço' })
  street: string;

  @ApiProperty()
  @IsString({ message: 'informe o número do endereço' })
  number: string;

  @ApiProperty()
  @IsString({ message: 'informe a cidade' })
  city: string;

  @ApiProperty()
  @IsString({ message: 'informe o bairro' })
  district: string;

  @ApiPropertyOptional()
  @IsString({ message: 'informe o estado' })
  state: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'informe o complemento' })
  complement: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'informe se é o principal' })
  isMain: boolean;
}
