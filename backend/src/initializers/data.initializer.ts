import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { TASK_MODEL, USER_MODEL } from '../database/constants';
import { Task } from '../database/schemas/task.schema';
import { User } from '../database/schemas/user.schema';
import { RoleType } from 'shared/enum/role-type.enum';

@Injectable()
export class DataInitializerService implements OnModuleInit {
    constructor(
        @Inject(USER_MODEL) private userModel: Model<User>,
        @Inject(TASK_MODEL) private taskModel: Model<Task>,
    ) {}

    async onModuleInit(): Promise<void> {
        if (process.env.IS_PRODUCT == 'true') {
            console.log('(Init_database) is initialized...');
            await this.userModel.deleteMany({});
            await this.taskModel.deleteMany({});
            console.log('Deleted all users and tasks.');

            const adminUser = await this.createAdminUser();
            console.log(`Admin user created: ${adminUser.user_name}`);

            await this.createFakeTasks(adminUser._id);
            console.log('Fake tasks created.');
        }
    }

    // Tạo tài khoản admin
    private async createAdminUser(): Promise<User> {
        const adminUser = new this.userModel({
            user_name: 'admin',
            name: 'Administrator',
            password: 'admin123',
            roles: [RoleType.ADMIN],
        });

        return adminUser.save();
    }

    private async createFakeTasks(adminUserId: string): Promise<void> {
        const tasks = [
            {
                user_id: adminUserId,
                title: 'Life is better when you 🐸🐸🐸🐸🐸🐸',
                link: 'https://x.com/batd_2610/status/1846593723473555692',
                des: 'This is the first admin task.',
                score: 150,
                status: 0,
            },
            {
                user_id: adminUserId,
                title: 'Life is better when you 🐸🐸🐸🐸🐸🐸🐸',
                link: 'https://x.com/batd_2610/status/1846593723473555692',
                des: 'This is the second admin task.',
                score: 120,
                status: 0,
            },
            {
                user_id: adminUserId,
                title: 'Life is better when you 🐸🐸🐸',
                link: 'https://x.com/batd_2610/status/1846593723473555692',
                des: 'This is the second admin task.',
                score: 120,
                status: 0,
            },
            {
                user_id: adminUserId,
                title: 'Life is better when you 🐸🐸🐸🐸',
                link: 'https://x.com/batd_2610/status/1846593723473555692',
                des: 'This is the second admin task.',
                score: 120,
                status: 0,
            },
            {
                user_id: adminUserId,
                title: 'Life is better when you 🐸🐸🐸🐸',
                link: 'https://x.com/batd_2610/status/1846593723473555692',
                des: 'This is the second admin task.',
                score: 120,
                status: 0,
            },
            {
                user_id: adminUserId,
                title: 'Life is better when you 🐸🐸🐸🐸🐸',
                link: 'https://x.com/batd_2610/status/1846593723473555692',
                des: 'This is the second admin task.',
                score: 120,
                status: 0,
            },
        ];

        await this.taskModel.insertMany(tasks);
    }
}
