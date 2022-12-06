import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AddressService } from '../address/address.service';
import { CreateAddressDto } from '../address/dto/create-address.dto';
import { EditAddressDto } from '../address/dto/edit-address.dto';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client-dto';
import { EditClientDto } from './dto/edit-client-dto';

@ApiTags('Clientes')
@Controller('clients')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly addressService: AddressService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os clientes de um usuário.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getClientsByUser(@Request() req) {
    return await this.clientService.getClientsByUser(req.user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Criar cliente',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  async createClient(@Request() req, @Body() createClientDto: CreateClientDto) {
    return await this.clientService.createClient(req.user, createClientDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Editar cliente',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id do cliente que deseja alterar',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  async editClient(
    @Request() req,
    @Param('id') clientId,
    @Body() editClientDto: EditClientDto,
  ) {
    return await this.clientService.editClient(
      req.user,
      clientId,
      editClientDto,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Visualizar um cliente pelo id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id do cliente que deseja visualizar',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  async getClientById(@Request() req, @Param('id') clientId) {
    return await this.clientService.getClientById(req.user, clientId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Visualizar um cliente pelo id',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id do cliente que deseja excluir',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  async deleteById(@Request() req, @Param('id') clientId) {
    return await this.clientService.deleteById(req.user, clientId);
  }

  @Get(':id/addresses')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Visualizar os endereços de um cliente',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id do cliente que deseja visualizar os endereços',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  async getAddressByClientId(@Request() req, @Param('id') clientId) {
    return await this.addressService.getAddressesByClient(clientId);
  }

  @Post(':id/addresses')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Cadastra um endereço para um cliente',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id do cliente que deseja adicionar um endereço',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  async createAddressByClientId(
    @Request() req,
    @Param('id') clientId,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return await this.addressService.createAddressToClient(
      clientId,
      createAddressDto,
    );
  }

  @Put(':id/addresses/:addressId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Altera um endereço para um cliente',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id do cliente que deseja altera um endereço',
  })
  @ApiParam({
    name: 'addressId',
    required: true,
    description: 'Id do endereço que deseja alterar',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  async editAddressByClientId(
    @Param('id') clientId,
    @Param('addressId') addressId,
    @Body() editAddressDto: EditAddressDto,
  ) {
    return await this.addressService.editAddress(
      clientId,
      addressId,
      editAddressDto,
    );
  }

  @Delete(':id/addresses/:addressId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Excluir um endereço para um cliente',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id do cliente que deseja excluir um endereço',
  })
  @ApiParam({
    name: 'addressId',
    required: true,
    description: 'Id do endereço que deseja excluir',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  async deleteAddressToClient(
    @Param('id') clientId,
    @Param('addressId') addressId,
  ) {
    return await this.addressService.deleteAddress(clientId, addressId);
  }
}
