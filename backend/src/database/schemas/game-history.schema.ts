import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Type } from 'class-transformer';
import { User } from './user.schema';

export type GameHistoryDocument = HydratedDocument<GameHistory>;

@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true
})
export class GameHistory {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    user_id: string;

    @Prop({ required: true })
    score: number;

    @Prop({ required: true })
    ip: string; 

    @Prop({ required: true })
    browser: string;

    @Prop({ required: true, default: '' })
    data: string;

    @Type(() => User)
    user: User;
}

export const GameHistorySchema = SchemaFactory.createForClass(GameHistory);

GameHistorySchema.pre(['find', 'findOne'], function () {
    this.populate({
        path: 'user_id',
        select: '_id telegram_id username',
    });
});