import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ResTaskDto } from './dto/response.task.dto';
import { from, map, Observable } from 'rxjs';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) {
        console.log('TaskService initialized ...');
    }

    async getTasks(
        userId: string,
    ): Promise<{ data: ResTaskDto[]; lastRecord: string | null }> {
        const tasks = await this.prisma.task.findMany({
            where: { status: 'OPEN' },
            include: {
                TaskHistory: {
                    where: { user_id: userId },
                },
            },
        });
        const lastRecord = tasks.length ? tasks[tasks.length - 1].id : null;

        return {
            data: tasks.map((task) => ({
                _id: task.id,
                title: task.title,
                link: task.link,
                description: task.description,
                status: task.status,
                score: task.score,
                history: task.TaskHistory.length > 0,
            })),
            lastRecord,
        };
    }

    findById(id: string): Observable<Task> {
        return from(this.prisma.task.findUnique({ where: { id } })).pipe(
            map((task) => {
                if (!task) {
                    throw new NotFoundException(`Task with id ${id} not found`);
                }
                return task;
            }),
        );
    }

    async save(createTaskDto: CreateTaskDto, userId: string) {
        return await this.prisma.task.create({
            data: {
                ...createTaskDto,
                user_id: userId,
                status: 'OPEN',
            },
        });
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
        const task = await this.prisma.task.findUnique({ where: { id } });
        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return await this.prisma.task.update({
            where: { id },
            data: {
                title: updateTaskDto.title || task.title,
                link: updateTaskDto.link || task.link,
                description: updateTaskDto.description || task.description,
            },
        });
    }

    async delete(id: string) {
        const task = await this.prisma.task.update({
            where: { id },
            data: {
                status: 'COMPLETED',
            },
        });

        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return task;
    }
}
