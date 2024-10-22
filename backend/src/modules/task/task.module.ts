import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        DatabaseModule,
        CacheModule.register(),
    ],
    controllers: [TaskController],
    providers: [TaskService],
    exports: [TaskService]
})
export class TaskModule { }
