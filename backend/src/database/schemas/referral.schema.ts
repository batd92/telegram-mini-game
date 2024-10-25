import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Type } from 'class-transformer';
import { TelegramUser } from './telegram-user.schema';

export type ReferralDocument = HydratedDocument<Referral>;

@Schema({ timestamps: true })
export class Referral {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'TelegramUser', required: true })
    @Type(() => TelegramUser)
    user_id: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'TelegramUser', required: true })
    @Type(() => TelegramUser)
    referred_user_id: string;

    @Prop({ required: true })
    score: number; 
}

export const ReferralSchema = SchemaFactory.createForClass(Referral);

ReferralSchema.pre(['find', 'findOne'], function () {
    this.populate({
        path: 'user_id',
        select: '_id user_name telegram_id',
    }).populate('referred_user_id');
});

