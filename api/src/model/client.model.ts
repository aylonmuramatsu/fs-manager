import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'client',
})
export class Client extends Model {
  @Column
  name: string;

  @Column
  birthdate: Date;

  @Column
  cpf: string;

  @Column
  rg: string;

  @Column
  phone: string;

  @Column
  user_id: number;
}
