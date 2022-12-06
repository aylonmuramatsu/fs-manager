import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt/dist';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtStrategy } from 'src/guards/jwt.strategy';
import { User } from 'src/model/user.model';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: process.env.EXPIRES_TOKEN,
      },
    }),
  ],
  providers: [AuthenticationService, JwtStrategy],
  controllers: [AuthenticationController],
  exports: [],
})
export class AuthenticationModule {}
