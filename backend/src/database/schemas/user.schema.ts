import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { RoleType } from 'shared/enum/role-type.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, toJSON: { virtuals: true }, collection: 'users' })
export class User {    

    @Prop({ unique: true, trim: true })
    user_name: string;

    @Prop({ unique: true, trim: true })
    name: string;

    @Prop({})
    password: string;

    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: string;

    @Prop({ type: [String], enum: RoleType, default: [RoleType.ADMIN] })
    roles?: RoleType[];
}

export const UserSchema = SchemaFactory.createForClass(User);