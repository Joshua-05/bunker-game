import { Model, Column, Table, HasMany, BelongsToMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Lobbi } from 'src/modules/lobbi/models/lobbi.model';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

  // @HasMany(() => UserLobby, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE'
  // })
  // userLobbi: UserLobby[]

  // @BelongsToMany(() => Lobbi, () => UserLobby)
  // lobbys: Lobbi[]

  @ForeignKey(() => Lobbi)
  @Column
  lobbyId: number;

  @BelongsTo(() => Lobbi)
  lobby: Lobbi;
}
