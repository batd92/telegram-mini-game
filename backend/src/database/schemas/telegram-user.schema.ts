import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { RoleType } from 'shared/enum/role-type.enum';

export type TelegramUserDocument = HydratedDocument<TelegramUser>;

@Schema({ timestamps: true, toJSON: { virtuals: true }, collection: 'telegram_users'})
export class TelegramUser {    
    @Prop({ required: true })
    is_bot: boolean;

    @Prop({ required: true, unique: true })
    telegram_id: string;

    @Prop({ unique: true, trim: true })
    user_name: string;

    @Prop({ trim: true })
    first_name?: string;

    @Prop({ trim: true })
    last_name?: string;

    @Prop({ trim: true })
    language_code?: string;

    @Prop({ default: true })
    can_join_groups?: boolean;

    @Prop({ default: false })
    supports_inline_queries?: boolean;

    @Prop({ default: false })
    can_read_all_group_messages?: boolean;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'TelegramUser', required: false })
    referral_code?: string;

    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: string;

    @Prop({ type: [String], enum: RoleType, default: [RoleType.USER] })
    roles?: RoleType[];

    get name(): string {
        return `${this.first_name ?? ''} ${this.last_name ?? ''}`.trim();
    }
}

export const TelegramUserSchema = SchemaFactory.createForClass(TelegramUser);

TelegramUserSchema.pre(['find', 'findOne'], function () {
    this.populate({
        path: 'referral_code',
        select: '_id telegram_id user_name',
    });
});