import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsString({ message: 'informe o e-mail.' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'informe a senha.' })
  password: string;
}
