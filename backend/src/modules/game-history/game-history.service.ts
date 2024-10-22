import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Observable, catchError, from, map, mergeMap, of } from 'rxjs';
import { CreateGameHistoryDto } from './dto/create-game-history.dto';
import { GAME_HISTORY_MODEL, GAME_USER_MODEL } from 'database/constants';
import { GameHistory } from 'database/schemas/game-history.schema';
import { ResGameHistoryDto } from './dto/response.game-history.dto';
import { GameUserService } from 'modules/game-user/game-user.service';

@Injectable()
export class GameHistoryService {
    constructor(
        @Inject(GAME_HISTORY_MODEL) private gameHistoryModel: Model<GameHistory>,
        private readonly gameUserService: GameUserService
    ) { }

    getGameHistorys(user_id: string): Observable<{ tasks: GameHistory[], lastRecord: string | null }> {
        return from(
            this.gameHistoryModel.find({ user_id })
                .sort({ createdAt: -1 })
                .limit(10)
                .exec()
                .then((tasks) => ({
                    tasks,
                    lastRecord: tasks.length > 0 ? tasks[tasks.length - 1]._id.toString() : null,
                }))
        );
    }

    getTotalScore(user_id: string): Observable<number> {
        return from(
            this.gameHistoryModel.aggregate([
                { $match: { user_id } },
                { $group: { _id: null, totalScore: { $sum: '$score' } } },
            ])
            .then(result => result.length > 0 ? result[0].totalScore : 0)
        );
    }

    save(createGameHistoryDto: CreateGameHistoryDto, userId: string, ip: string, userAgent: string): Observable<ResGameHistoryDto> {
        return this.gameUserService.getGameUserById(userId).pipe(
            mergeMap((gameUser) => {
                if (!gameUser) {
                    throw new NotFoundException('User not found');
                }
                if (gameUser.remaining_play <= 0) {
                    throw new ForbiddenException('No remaining plays left');
                }

                const newGameHistory = new this.gameHistoryModel({
                    ...createGameHistoryDto,
                    user_id: userId,
                    ip: ip,
                    browser: userAgent,
                });

                gameUser.remaining_play--;
                gameUser.number_of_attempts++;

                return from(Promise.all([
                    newGameHistory.save(),
                    gameUser.save(),
                ])).pipe(
                    mergeMap(() => {
                        return of({
                            number_of_attempts: gameUser.number_of_attempts,
                            remaining_play: gameUser.remaining_play,
                            status: true,
                        } as ResGameHistoryDto);
                    }),
                    catchError(() => {
                        return of({
                            number_of_attempts: gameUser.number_of_attempts,
                            remaining_play: gameUser.remaining_play,
                            status: false,
                        } as ResGameHistoryDto);
                    })
                );
            }),
            catchError(() => {
                return of({
                    number_of_attempts: 0,
                    remaining_play: 0,
                    status: false,
                } as ResGameHistoryDto);
            }),
        );
    }

    delete(id: string): Observable<GameHistory> {
        return from(
            this.gameHistoryModel.findByIdAndDelete(id).exec().then((gameHistory) => {
                if (!gameHistory) {
                    throw new NotFoundException('GameHistory not found');
                }
                return gameHistory;
            })
        );
    }
}
