import { Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Combination } from "./combination.model";
import { Player } from "src/modules/game/models/player.model";

@Table
export class Card extends Model{
    @ForeignKey(() => Player)

    @Column
    type: string;

    @Column
    name: string;

    @Column
    importance: number;

    @Column
    descripton: string;

    // @ForeignKey(() => Combination)
    // @Column
    // combinationId?: number;

    @HasMany(() => Combination)
    combinations: Combination[];
}