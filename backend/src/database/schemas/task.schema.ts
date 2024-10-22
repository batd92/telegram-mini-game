import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true,  })
export class Task {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
    user_id: string;

    @Prop({ required: true, index: true })
    title: string;

    @Prop({ required: true })
    link: string;

    @Prop({ required: false })
    des: string;

    @Prop({ required: true , default: 100 })
    score: number;

    @Prop({ required: true })
    status: number;

}

export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.pre(['find', 'findOne'], function () {
    this.populate({
        path: 'user_id',
        select: '_id telegram_id username',
    });
});
