import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsString({ message: 'informe o nome completo.' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'informe o e-mail.' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'informe a senha.' })
  password: string;
}
