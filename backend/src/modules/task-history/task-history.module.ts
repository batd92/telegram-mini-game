import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { CacheModule } from '@nestjs/cache-manager';
import { TaskHistoryController } from './task-history.controller';
import { TaskHistoryService } from './task-history.service';
import { TaskModule } from 'modules/task/task.module';

@Module({
    imports: [
        DatabaseModule,
        CacheModule.register(),
        TaskModule
    ],
    controllers: [TaskHistoryController],
    providers: [TaskHistoryService],
    exports: [TaskHistoryService]
})
export class TaskHistoryModule { }
