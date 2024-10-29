import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Req
} from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { RoleType } from '../../shared/enum/role-type.enum';
import { HasRoles } from '../../auth/guard/has-roles.decorator';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { CreateGameHistoryDto } from './dto/create-game-history.dto';
import { GameHistoryService } from './game-history.service';
import { Request } from 'express';
import { ResGameHistoryDto, ResListGameHistoryDto } from './dto/response.game-history.dto';
@Controller('game-history')
@UseGuards(JwtAuthGuard, RolesGuard)
export class GameHistoryController {
    constructor(private readonly gameHistoryService: GameHistoryService) { }

    @HasRoles(RoleType.USER)
    @Get()
    getGameHistorys(@Req() req: any): Observable<{ data: ResListGameHistoryDto[], lastRecord: string | null }> {
        const user = req.user as { id: string };
        return this.gameHistoryService.getGameHistorys(user.id);
    }

    @HasRoles(RoleType.USER)
    @Post()
    async createGameHistory(
        @Body() createGameHistoryDto: CreateGameHistoryDto,
        @Req() req: Request
    ): Promise<ResGameHistoryDto> {
        const user = req.user as { id: string };

        const forwardedFor = req.headers['x-forwarded-for'];
        const ip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor ? forwardedFor.split(',')[0] : req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'];
        return lastValueFrom(this.gameHistoryService.save(createGameHistoryDto, user.id, ip, userAgent));
    }
}
