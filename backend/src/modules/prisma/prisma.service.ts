import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Task } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        await this.createSampleData();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    private async createSampleData() {
        const userCount = await this.user.count();
        if (userCount === 0) {
            const adminUser = await this.user.create({
                data: {
                    user_name: 'admin',
                    password: 'admin123',
                    name: 'Admin',
                    roles: ['ADMIN'],
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            });

            console.log(`Admin user created: ${adminUser.user_name}`);

            await this.task.create({
                data: {
                    title: 'Task 1: Life is better when you 🐸',
                    link: 'https://x.com/batd_2610/status/1846593723473555692',
                    description: 'This is the first admin task.',
                    score: 150,
                    status: 'OPEN',
                    user_id: adminUser.id,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            });
            console.log('Fake tasks created.');
        }
    }
}
