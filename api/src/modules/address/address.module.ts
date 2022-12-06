import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from 'src/model/address.model';
import { AddressService } from './address.service';

@Module({
  imports: [SequelizeModule.forFeature([Address])],
  providers: [AddressService],
  controllers: [],
  exports: [AddressService],
})
export class AddressModule {}
