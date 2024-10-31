import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TaskHistoryController } from './task-history.controller';
import { TaskHistoryService } from './task-history.service';
import { TaskModule } from 'modules/task/task.module';

@Module({
    imports: [CacheModule.register(), TaskModule],
    controllers: [TaskHistoryController],
    providers: [TaskHistoryService],
    exports: [TaskHistoryService],
})
export class TaskHistoryModule {}
