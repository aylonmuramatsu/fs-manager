import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'address',
})
export class Address extends Model {
  @Column
  zipcode: string;

  @Column
  street: string;

  @Column
  number: string;

  @Column
  district: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  is_main: number;

  @Column
  client_id: number;

  @Column
  complement: string;
}
