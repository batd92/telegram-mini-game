import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Observable, catchError, from, map, mergeMap, of } from 'rxjs';
import { CreateGameHistoryDto } from './dto/request.dto';
import { ResGameHistoryDto, ResListGameHistoryDto } from './dto/response.dto';
import { GameHistory } from 'models/game-history.model';

@Injectable()
export class GameHistoryService {
    constructor(private readonly prisma: PrismaService) {}

    getGameHistorys(user_id: string): Observable<{
        data: ResListGameHistoryDto[];
        lastRecord: string | null;
    }> {
        return from(
            this.prisma.gameHistory.findMany({
                where: { user_id },
                orderBy: { created_at: 'desc' },
            }),
        ).pipe(
            map((data) => ({
                data: data.map((rd) => ({
                    score: rd.score,
                    created_at: rd.created_at.getTime().toString(),
                    _id: rd.id,
                })),
                lastRecord: data.length > 0 ? data[data.length - 1].id : null,
            })),
        );
    }

    getTotalScore(user_id: string): Observable<number> {
        return from(
            this.prisma.gameHistory.aggregate({
                _sum: {
                    score: true,
                },
                where: { user_id },
            }),
        ).pipe(map((result) => result._sum.score || 0));
    }

    getLastGameHistory(user_id: string): Observable<GameHistory | null> {
        return from(
            this.prisma.gameHistory.findFirst({
                where: { user_id },
                orderBy: { created_at: 'desc' },
            }),
        );
    }

    save(
        createGameHistoryDto: CreateGameHistoryDto,
        userId: string,
        ip: string,
        userAgent: string,
    ): Observable<ResGameHistoryDto> {
        return from(
            this.prisma.$transaction(async (prisma) => {
                const gameProfile = await prisma.gameProfile.findFirst({
                    where: { user_id: userId },
                });

                if (!gameProfile) {
                    throw new NotFoundException('Game profile not found');
                }

                if (gameProfile.remaining_play <= 0) {
                    throw new ForbiddenException('No remaining plays left');
                }

                const gameHistory = await prisma.gameHistory.create({
                    data: {
                        user_id: userId,
                        ip,
                        browser: userAgent,
                        score: createGameHistoryDto.score,
                        data: createGameHistoryDto.data,
                    },
                });

                const updatedGameProfile = await prisma.gameProfile.update({
                    where: { id: gameProfile.id },
                    data: {
                        remaining_play: { decrement: 1 },
                        number_of_attempts: { increment: 1 },
                    },
                });

                return this.buildResponse(updatedGameProfile);
            }),
        ).pipe(catchError((err) => this.handleError(err)));
    }

    private buildResponse(gameUser: any): ResGameHistoryDto {
        return {
            number_of_attempts: gameUser.number_of_attempts,
            remaining_play: gameUser.remaining_play,
            status: true,
        } as ResGameHistoryDto;
    }

    private handleError(err: any): Observable<ResGameHistoryDto> {
        console.error(err);
        return of({
            number_of_attempts: 0,
            remaining_play: 0,
            status: false,
        } as ResGameHistoryDto);
    }
}
