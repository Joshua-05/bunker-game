import { Model, Column, Table, HasMany, BelongsToMany} from 'sequelize-typescript';
import { User } from 'src/modules/user/models/user.model';

@Table
export class Lobbi extends Model {
  @Column
  name: string;

  @Column
  current: number;

  @Column
  count: number;

  @Column
  access: string;

  @Column
  password?: string;

  @HasMany(() => User)
  users: User[]
}


  // @HasMany(() => UserLobby, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE'
  // })
  // userLobbi: UserLobby[]

  // @BelongsToMany(() => User, () => UserLobby)
  // users: User[]