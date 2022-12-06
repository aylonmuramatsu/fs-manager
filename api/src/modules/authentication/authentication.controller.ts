import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@ApiTags('Autenticação')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'Rota de cadastro de usuário',
  })
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authenticationService.signUp(signUpDto);
  }

  @Post('sign-in')
  @UsePipes(ValidationPipe)
  @ApiOperation({
    summary: 'Rota de efetuar login',
  })
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authenticationService.signIn(signInDto);
  }
}
