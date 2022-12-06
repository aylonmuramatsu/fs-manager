import { Module } from '@nestjs/common';
import { Client } from 'src/model/client.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [SequelizeModule.forFeature([Client]), AddressModule],
  providers: [ClientService],
  controllers: [ClientController],
})
export class ClientModule {}
