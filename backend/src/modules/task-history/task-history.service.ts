import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Observable, from, map, switchMap } from 'rxjs';
import { CreateTaskHistoryDto } from './dto/request.dto';
import { TaskService } from 'modules/task/task.service';
import { Task, TaskHistory } from '@prisma/client';

@Injectable()
export class TaskHistoryService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly taskService: TaskService,
    ) {}

    save(
        createTaskHistoryDto: CreateTaskHistoryDto,
        user_id: string,
        ip: string,
        userAgent: string,
    ): Observable<TaskHistory> {
        return this.taskService.findById(createTaskHistoryDto.task_id).pipe(
            switchMap((task: Task | null) => {
                if (!task || task.status === 'COMPLETED') {
                    throw new NotFoundException(
                        'Task does not exist or has been deleted',
                    );
                }

                return from(
                    this.prisma.taskHistory.findFirst({
                        where: {
                            user_id: user_id,
                            task_id: createTaskHistoryDto.task_id,
                        },
                    }),
                ).pipe(
                    map((existingTaskHistory) => ({
                        existingTaskHistory,
                        task,
                    })),
                );
            }),
            switchMap(({ existingTaskHistory, task }) => {
                if (existingTaskHistory) {
                    throw new ConflictException(
                        'TaskHistory already exists for this user and task',
                    );
                }

                return from(
                    this.prisma.taskHistory.create({
                        data: {
                            user_id: user_id,
                            task_id: createTaskHistoryDto.task_id,
                            score: task.score,
                            ip: ip,
                            browser: userAgent,
                            data: '',
                        },
                    }),
                );
            }),
        );
    }

    getTotalScore(user_id: string): Observable<number> {
        return from(
            this.prisma.taskHistory
                .aggregate({
                    where: { user_id: user_id },
                    _sum: { score: true },
                })
                .then((result) => result._sum.score ?? 0),
        );
    }

    findById(id: string): Observable<TaskHistory> {
        return from(
            this.prisma.taskHistory
                .findUnique({
                    where: { id },
                })
                .then((taskHistory) => {
                    if (!taskHistory) {
                        throw new NotFoundException('TaskHistory not found');
                    }
                    return taskHistory;
                }),
        );
    }

    delete(id: string): Observable<TaskHistory> {
        return from(
            this.prisma.taskHistory
                .delete({
                    where: { id },
                })
                .then((taskHistory) => {
                    if (!taskHistory) {
                        throw new NotFoundException('TaskHistory not found');
                    }
                    return taskHistory;
                }),
        );
    }
}
