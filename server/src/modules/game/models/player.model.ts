import { Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Card } from "src/modules/card/models/card.model";
import { Game } from "./game.model";

@Table
export class Player extends Model{
    @ForeignKey(() => Game)
    @Column
    gameId: number

    @Column
    username: string;

    @Column
    userId: number;

    @Column
    state: string;

    @HasMany(() => Card)
    cards: Card[]
}