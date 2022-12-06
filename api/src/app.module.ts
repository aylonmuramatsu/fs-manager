import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganModule, MorganInterceptor } from 'nest-morgan';

import { Address } from './model/address.model';
import { Client } from './model/client.model';
import { User } from './model/user.model';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ClientModule } from './modules/clients/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: false,
      define: {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        collate: 'utf8_general_ci',
        charset: 'utf8',
      },
      timezone: '-03:00',
      models: [Address, User, Client],
    }),
    MorganModule,
    AuthenticationModule,
    ClientModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
  ],
})
export class AppModule {}
