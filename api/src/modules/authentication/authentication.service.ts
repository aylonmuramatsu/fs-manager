import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/model/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import * as crypto from 'bcryptjs';
import getSession from 'src/util/getSession';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const passwordHash = await crypto.hash(signUpDto.password, 8);

    const userExists = await this.userModel.findOne({
      where: {
        email: signUpDto.email,
      },
    });

    if (userExists)
      throw new BadRequestException('Você já possui cadastro, efetue o login!');

    const user = await this.userModel.create({
      name: signUpDto.name,
      email: signUpDto.email,
      password: passwordHash,
    });

    //Gero uma sessão para redirecionar automaticamente para tela inicial do sistema
    return {
      user: getSession(user),
      token: this.jwtService.sign(
        { id: user.id },
        { expiresIn: process.env.EXPIRES_TOKEN },
      ),
    };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userModel.findOne({
      where: {
        email: signInDto.email.trim(),
      },
    });

    //NOTE - Não informo corretamente o motivo do login falhar, por motivos de segurança.
    if (!user) throw new NotFoundException('Usuário/Senha incorreto.');

    const checkPassword = await crypto.compare(
      signInDto.password.trim(),
      user.password,
    );

    if (!checkPassword) throw new NotFoundException('Usuário/Senha incorretos');

    return {
      user: getSession(user),
      token: this.jwtService.sign(
        { id: user.id },
        { expiresIn: process.env.EXPIRES_TOKEN },
      ),
    };
  }
}
