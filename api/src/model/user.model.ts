import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'user',
})
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;
}
