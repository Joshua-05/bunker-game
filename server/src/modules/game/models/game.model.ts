import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Player } from "./player.model";

@Table
export class Game extends Model{
    @Column
    name: string;

    @Column
    status: string;

    @Column
    count: number;

    @HasMany(() => Player)
    players: Player[]
}