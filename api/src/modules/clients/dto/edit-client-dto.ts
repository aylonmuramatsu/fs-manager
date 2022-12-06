import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { IsString, IsDate, IsOptional } from 'class-validator';

export class EditClientDto {
  @ApiPropertyOptional()
  @IsString({ message: 'informe o nome.' })
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birthdate: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.replace(/[^\d]/g, '').trim())
  phone: string;
}
