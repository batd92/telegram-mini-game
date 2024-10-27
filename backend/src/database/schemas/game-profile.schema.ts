import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Type } from 'class-transformer';
import { TelegramUser } from './telegram-user.schema';

export type GameProfileDocument = HydratedDocument<GameProfile>;

@Schema({ 
    timestamps: true,
    collection: 'game_profiles'
 })
export class GameProfile {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'TelegramUser', required: true })
    @Type(() => TelegramUser)
    user_id: string;

    @Prop({ required: true, default: 0 })
    number_of_attempts: number;

    @Prop({ required: true, default: 0 })
    remaining_play: number;

    @Prop({ required: false, default: 100 })
    earned_points: number;

    @Prop({ required: false, default: 100 })
    duration: number;
}

export const GameProfileSchema = SchemaFactory.createForClass(GameProfile);

GameProfileSchema.pre(['find', 'findOne'], function () {
    this.populate({
        path: 'user_id',
        select: '_id user_name telegram_id',
    });
});

