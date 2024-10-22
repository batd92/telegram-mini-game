import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { User } from './user.schema';
import { Type } from 'class-transformer';

export type ReferralDocument = HydratedDocument<Referral>;

@Schema({ timestamps: true })
export class Referral {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    @Type(() => User)
    user_id: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    @Type(() => User)
    referred_user_id: string;

    @Prop({ required: true })
    score: number; 
}

export const ReferralSchema = SchemaFactory.createForClass(Referral);

ReferralSchema.pre(['find', 'findOne'], function () {
    this.populate({
        path: 'user_id',
        select: '_id username telegram_id',
    }).populate('referred_user_id');
});

