import { Task as PrismaTask, TaskStatus } from '@prisma/client';

export class Task implements PrismaTask {
    id: string;
    user_id: string;
    title: string;
    link: string;
    description: string;
    score: number;
    status: TaskStatus;
    created_at: Date;
    updated_at: Date;
}
