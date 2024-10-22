import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { User } from './user.schema';
import { Type } from 'class-transformer';

export type GameUserDocument = HydratedDocument<GameUser>;

@Schema({ timestamps: true })
export class GameUser {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    @Type(() => User)
    user_id: string;

    @Prop({ required: true, default: 0 })
    number_of_attempts: number;

    @Prop({ required: true, default: 0 })
    remaining_play: number;

    @Prop({ required: false, default: 100 })
    earned_points: number; 
}

export const GameUserSchema = SchemaFactory.createForClass(GameUser);

GameUserSchema.pre(['find', 'findOne'], function () {
    this.populate({
        path: 'user_id',
        select: '_id username telegram_id',
    });
});

