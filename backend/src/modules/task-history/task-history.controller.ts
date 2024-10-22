import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
    Get
} from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { TaskHistoryService } from './task-history.service';
import { CreateTaskHistoryDto } from './dto/create-task-history.dto';
import { RoleType } from '../../shared/enum/role-type.enum';
import { HasRoles } from '../../auth/guard/has-roles.decorator';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { TaskHistory } from 'database/schemas/task-history.schema';

@Controller('task-history')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TaskHistoryController {
    constructor(private readonly taskHistoryService: TaskHistoryService) { }

    @HasRoles(RoleType.USER)
    @Post()
    async createTaskHistory(
        @Body() createTaskHistoryDto: CreateTaskHistoryDto,
        @Req() req: any
    ): Promise<TaskHistory> {
        const user = req.user as { userId: string };

        const forwardedFor = req.headers['x-forwarded-for'];
        const ip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor ? forwardedFor.split(',')[0] : req.connection.remoteAddress;

        const userAgent = req.get('User-Agent') || '';

        return lastValueFrom(this.taskHistoryService.save(createTaskHistoryDto, user.userId, ip, userAgent));
    }

    @Get('total-score')
    @HasRoles(RoleType.USER)
    getTotalScore(@Req() req: any): Observable<number> {
        const user = req.user as { userId: string };
        return this.taskHistoryService.getTotalScore(user.userId);
    }
}
