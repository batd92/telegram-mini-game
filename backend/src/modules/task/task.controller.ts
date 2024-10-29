import {
    Controller,
    Get,
    UseGuards,
    Query,
    Req,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TaskService } from './task.service';
import { RoleType } from '../../shared/enum/role-type.enum';
import { HasRoles } from '../../auth/guard/has-roles.decorator';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { ResTaskDto } from './dto/response.task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
@HasRoles(RoleType.USER)
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    getTask(@Req() req: any): Observable<{ data: ResTaskDto[], lastRecord: string | null }> {
        const user = req.user as { id: string };
        return this.taskService.getTasks(user.id);
    }
}