import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from 'src/model/address.model';
import { CreateAddressDto } from './dto/create-address.dto';
import { EditAddressDto } from './dto/edit-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address)
    private readonly addressModel: typeof Address,
  ) {}

  async getAddressesByClient(clientId: number) {
    const address = await this.addressModel.findAll({
      where: {
        client_id: clientId,
      },
    });

    return address;
  }

  async createAddressToClient(
    clientId: number,
    createAddressDto: CreateAddressDto,
  ) {
    //Verifico quantos ele possui cadastrado, essa informação sera relevante no caso de ser a primeira
    const addresses = await this.getAddressesByClient(clientId);

    // Se este for marcado como principal deve mudar o status dos anteriores.
    if (createAddressDto.isMain) {
      await this.addressModel.update(
        { is_main: 'N' },
        {
          where: {
            client_id: clientId,
          },
        },
      );
    }
    //Cadastra os novos
    const address = await this.addressModel.create({
      zipcode: createAddressDto.zipcode,
      city: createAddressDto.city,
      number: createAddressDto.number,
      street: createAddressDto.street,
      district: createAddressDto.district,
      state: createAddressDto.state,
      complement: createAddressDto.complement,
      client_id: clientId,
      is_main:
        addresses.length === 0 ? 'Y' : createAddressDto.isMain ? 'Y' : 'N',
    });

    return address;
  }

  async editAddress(
    clientId: number,
    addressId: number,
    editAddressDto: EditAddressDto,
  ) {
    //Verifico quantos ele possui cadastrado, essa informação sera relevante no caso de ser a primeira
    const addresses = await this.getAddressesByClient(clientId);

    // Se este for marcado como principal deve mudar o status dos anteriores.
    if (editAddressDto.isMain) {
      await this.addressModel.update(
        { is_main: 'N' },
        {
          where: {
            client_id: clientId,
          },
        },
      );
    }
    const address = await this.addressModel.findByPk(addressId);
    if (!address) throw new NotFoundException('Endereço não encontrado.');
    const hasMain = !!addresses
      .map((a) => a.toJSON())
      .find((i) => i.is_main === 'Y');
    address.update({
      zipcode: editAddressDto.zipcode,
      city: editAddressDto.city,
      number: editAddressDto.number,
      street: editAddressDto.street,
      district: editAddressDto.district,
      state: editAddressDto.state,
      complement: editAddressDto.complement,
      client_id: clientId,
      is_main: !hasMain ? 'Y' : editAddressDto.isMain ? 'Y' : 'N',
    });
  }

  async deleteAddress(clientId: number, addressId: number) {
    const address = await this.addressModel.findOne({
      where: {
        id: addressId,
        client_id: clientId,
      },
    });
    if (!address) throw new NotFoundException('Endereço não encontrado.');

    await address.destroy();
  }
  async deleteAllAddress(clientId: number) {
    await this.addressModel.destroy({
      where: {
        client_id: clientId,
      },
    });
  }
}
