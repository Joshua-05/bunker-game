import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Card } from "./card.model";

@Table
export class Combination extends Model{
    @ForeignKey(() => Card)
    @Column
    cardId: number;

    @BelongsTo(() => Card)
    card: Card;

    @ForeignKey(() => Card)
    @Column
    associatedCardId: number;

    @BelongsTo(() => Card)
    associatedCard: Card;

    @Column
    importance: number;
}