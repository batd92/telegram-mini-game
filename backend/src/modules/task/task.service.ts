import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TASK_MODEL } from 'database/constants';
import { Task } from 'database/schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ResTaskDto } from './dto/response.task.dto';

@Injectable()
export class TaskService {
    constructor(
        @Inject(TASK_MODEL) private readonly taskModel: Model<Task>,
    ) {
        console.log('TaskService initialized ...');
    }

    getTasks(user_id: string): Observable<{ data: ResTaskDto[], lastRecord: string | null }> {
        return from(
            this.taskModel.aggregate([
                {
                    $lookup: {
                        from: 'task_histories',
                        let: { task_id: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$task_id', '$$task_id'] },
                                            { $eq: ['$user_id', new Types.ObjectId(user_id)] },
                                        ],
                                    },
                                },
                            },
                        ],
                        as: 'history',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        link: 1,
                        des: 1,
                        status: 1,
                        score: 1,
                        history: { $gt: [{ $size: '$history' }, 0] },
                    },
                },
            ]).exec()
        ).pipe(
            map((taskResponses) => {
                const lastRecord = taskResponses.length ? taskResponses[taskResponses.length - 1]._id : null;
    
                return {
                    data: taskResponses.map(task => ({
                        _id: task._id.toString(),
                        title: task.title,
                        link: task.link,
                        des: task.des,
                        status: task.status,
                        score: task.score,
                        history: task.history,
                    })),
                    lastRecord,
                };
            }),
            catchError(err => {
                console.error(err);
                return of({ data: [], lastRecord: null });
            }),
        );
    }      

    findById(id: string): Observable<Task | null> {
        return from(this.taskModel.findById(id).exec()).pipe(
            map(task => task),
            catchError(err => {
                console.error(err);
                return of(null); // Trả về null nếu có lỗi
            }),
        );
    }

    async save(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
        const newTask = new this.taskModel({
            ...createTaskDto,
            user_id: userId,
            status: 1,
        });

        return await newTask.save();
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<{ task: Task }> {
        const task = await this.taskModel.findById(id).exec();
        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        task.title = updateTaskDto.title || task.title;
        task.link = updateTaskDto.link || task.link;
        task.des = updateTaskDto.des || task.des;

        const updatedTask = await task.save();
        return { task: updatedTask };
    }

    delete(id: string): Observable<Task> {
        return from(
            this.taskModel.findOneAndUpdate(
                { _id: id },
                { $set: { deletedAt: Date.now(), status: 0 } },
                { new: true },
            ).exec(),
        ).pipe(
            map(task => {
                if (!task) {
                    throw new NotFoundException(`Task with id ${id} not found`);
                }
                return task;
            }),
            catchError(err => {
                throw new Error(`Error deleting task: ${err.message}`);
            }),
        );
    }
}
