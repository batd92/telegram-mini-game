import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
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
        @Inject(TASK_MODEL) private taskModel: Model<Task>,
    ) {
        console.log('TaskService initialized ...');
    }

    getTasks(search?: string): Observable<{ data: ResTaskDto[], lastRecord: string | null }> {
        const query = search
            ? { title: { $regex: search.replace(/"/g, ''), $options: 'i' }, status: 1 }
            : { status: 1 };
    
        return from(this.taskModel.aggregate([
            { $match: query },
            { $sort: { createdAt: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: 'taskhistories',
                    localField: '_id',
                    foreignField: 'task_id',
                    as: 'task_history_info'
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    link: 1,
                    des: 1,
                    score: 1,
                    history: { $arrayElemAt: ['$task_history_info', 0] }
                }
            }
        ])).pipe(
            map(tasks => {
                const lastRecord = tasks.length > 0 ? tasks[tasks.length - 1]._id.toString() : null;
    
                const taskResponses: ResTaskDto[] = tasks.map(task => ({
                    _id: task._id.toString(),
                    title: task.title,
                    link: task.link,
                    des: task.des,
                    status: task.status,
                    history: task.history ? {
                        score: task.history.score,
                        ip: task.history.ip,
                        browser: task.history.browser,
                    } : null,
                }));
    
                return {
                    data: taskResponses,
                    lastRecord: lastRecord,
                };
            }),
            catchError(err => {
                return of({ data: [], lastRecord: null });
            })
        );
    }
    

    findById(id: string): Observable<Task | null> {
        return from(this.taskModel.findById(id).exec()).pipe(
            map((task: Task | null) => task)
        );
    }

    async save(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
        const newTask = new this.taskModel({
            ...createTaskDto,
            user_id: userId,
            status: 1,
        });

        const savedTask = await newTask.save();
        return savedTask;
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
            ).exec()
        ).pipe(
            map(task => {
                if (!task) {
                    throw new NotFoundException(`Task with id ${id} not found`);
                }
                return task;
            }),
            catchError(err => {
                throw new Error(`Error deleting task: ${err.message}`);
            })
        );
    }
}
