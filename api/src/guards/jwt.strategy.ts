import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/model/user.model';
import getSession from 'src/util/getSession';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }
  async validate(payload: any) {
    const user = await this.userModel.findByPk(payload.id);
    if (!user) throw new UnauthorizedException('Token expirado ou inválido');
    return getSession(user);
  }
}
