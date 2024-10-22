import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { TaskHistory } from 'database/schemas/task-history.schema';
import { Observable, from, map, switchMap } from 'rxjs';
import { CreateTaskHistoryDto } from './dto/create-task-history.dto';
import { TASK_HISTORY_MODEL } from 'database/constants';
import { TaskService } from 'modules/task/task.service';

@Injectable()
export class TaskHistoryService {
    constructor(
        @Inject(TASK_HISTORY_MODEL) private taskHistoryModel: Model<TaskHistory>,
        private readonly taskService: TaskService
    ) {}

    save(createTaskHistoryDto: CreateTaskHistoryDto, user_id: string, ip: string, userAgent: string): Observable<TaskHistory> {
        return this.taskService.findById(createTaskHistoryDto.task_id).pipe(
            switchMap(task => {
                if (!task || task.status === 1) {
                    throw new Error('Task does not exist or has been deleted');
                }
    
                return from(this.taskHistoryModel.findOne({ user_id: user_id, task_id: createTaskHistoryDto.task_id }).exec())
                    .pipe(
                        map(existingTaskHistory => ({ existingTaskHistory, task }))
                    );
            }),
            switchMap(({ existingTaskHistory, task }) => {
                if (existingTaskHistory) {
                    throw new Error('TaskHistory already exists for this user and task');
                }
    
                const newTaskHistory = new this.taskHistoryModel({
                    ...createTaskHistoryDto,
                    user_id: user_id,
                    ip: ip,
                    browser: userAgent,
                    score: task.score
                });
    
                return from(newTaskHistory.save());
            })
        );
    }

    getTotalScore(user_id: string): Observable<number> {
        return from(
            this.taskHistoryModel.aggregate([
                { $match: { user_id } },
                { $group: { _id: null, totalScore: { $sum: '$score' } } },
            ])
            .then(result => result.length > 0 ? result[0].totalScore : 0)
        );
    }

    findById(id: string): Observable<TaskHistory> {
        return from(
            this.taskHistoryModel.findById(id).exec().then((taskHistory) => {
                if (!taskHistory) {
                    throw new NotFoundException('TaskHistory not found');
                }
                return taskHistory;
            })
        );
    }

    delete(id: string): Observable<TaskHistory> {
        return from(
            this.taskHistoryModel.findByIdAndDelete(id).exec().then((taskHistory) => {
                if (!taskHistory) {
                    throw new NotFoundException('TaskHistory not found');
                }
                return taskHistory;
            })
        );
    }
}
