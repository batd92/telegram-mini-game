import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Type } from 'class-transformer';
import { TelegramUser } from './telegram-user.schema';
import { Task } from './task.schema';

export type TaskHistoryDocument = HydratedDocument<TaskHistory>;

@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true,
     collection: 'task_histories'
})
export class TaskHistory {
    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    _id: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'TelegramUser', required: true })
    @Type(() => TelegramUser)
    user_id: string;

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Task', required: true })
    task_id: string;

    @Prop({ required: true })
    score: number;

    @Prop({ required: true })
    ip: string; 

    @Prop({ required: true })
    browser: string;

    @Prop({ required: true, default: '' })
    data: string;

    @Type(() => TelegramUser)
    user: TelegramUser;

    @Type(() => Task)
    task: Task;

}

export const TaskHistorySchema = SchemaFactory.createForClass(TaskHistory);

TaskHistorySchema.pre(['find', 'findOne'], function (next) {
    this.populate({
        path: 'user_id',
        select: '_id telegram_id user_name',
    }).populate({
        path: 'task_id',
        select: '_id title status',
    });
    next();
});