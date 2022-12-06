import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Client } from 'src/model/client.model';
import { UserSession } from 'src/types/user-session';
import { AddressService } from '../address/address.service';
import { CreateClientDto } from './dto/create-client-dto';
import { EditClientDto } from './dto/edit-client-dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client)
    private readonly clientModel: typeof Client,
    private readonly addressService: AddressService,
  ) {}

  async getClientsByUser(user: UserSession) {
    return await this.clientModel.findAll({
      where: {
        user_id: user.id,
      },
    });
  }

  async createClient(user: UserSession, createClientDto: CreateClientDto) {
    const client = await this.clientModel.findOne({
      where: {
        [Op.or]: {
          cpf: createClientDto.cpf,
          rg: createClientDto.rg,
        },
      },
    });
    if (client) throw new BadRequestException('Cliente já cadastrado');
    return await this.clientModel.create({
      name: createClientDto.name,
      cpf: createClientDto.cpf,
      rg: createClientDto.rg,
      birthdate: createClientDto.birthdate,
      phone: createClientDto.phone,
      user_id: user.id,
    });
  }

  async editClient(
    user: UserSession,
    clientId: number,
    editClientDto: EditClientDto,
  ) {
    const client = await this.clientModel.findByPk(clientId);
    if (!client) throw new NotFoundException('Cliente não encontrado.');

    //Proteção contra injeção direta de id.
    if (client.user_id !== user.id)
      throw new NotFoundException('Você não pode executar essa operação.');

    await client.update({ ...editClientDto });
    await client.reload();
    return client;
  }

  async getClientById(user: UserSession, clientId: number) {
    const client = await this.clientModel.findByPk(clientId);
    if (!client) throw new NotFoundException('Cliente não encontrado.');

    //Proteção contra injeção direta de id.
    if (client.user_id !== user.id)
      throw new NotFoundException('Você não pode executar essa operação.');

    return client;
  }

  async deleteById(user: UserSession, clientId: number) {
    const client = await this.clientModel.findByPk(clientId);
    if (!client) throw new NotFoundException('Cliente não encontrado.');

    //Verifica se o cliente possui endereços para excluir
    const address = await this.addressService.getAddressesByClient(clientId);
    if (address.length > 0) {
      await this.addressService.deleteAllAddress(clientId);
    }

    //Proteção contra injeção direta de id.
    if (client.user_id !== user.id)
      throw new NotFoundException('Você não pode executar essa operação.');

    await client.destroy();
  }
}
