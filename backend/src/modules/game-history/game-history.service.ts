import { ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Observable, catchError, from, map, mergeMap, of } from 'rxjs';
import { CreateGameHistoryDto } from './dto/create-game-history.dto';
import { GAME_HISTORY_MODEL } from 'database/constants';
import { GameHistory, GameHistoryDocument } from 'database/schemas/game-history.schema';
import { ResGameHistoryDto, ResListGameHistoryDto } from './dto/response.game-history.dto';
import { GameProfileService } from 'modules/game-profile/game-profile.service';

@Injectable()
export class GameHistoryService {
    constructor(
        @Inject(GAME_HISTORY_MODEL) private gameHistoryModel: Model<GameHistory>,
        @Inject(forwardRef(() => GameProfileService)) private readonly gameProfileService: GameProfileService
    ) { }

    getGameHistorys(user_id: string): Observable<{ data: ResListGameHistoryDto[], lastRecord: string | null }> {
        return new Observable((observer) => {
            this.gameHistoryModel.find({ user_id: new Types.ObjectId(user_id)})
                .sort({ createdAt: -1 })
                .exec()
                .then((data) => {
                    const result = {
                        data: data.map((rd) => ({
                            score: rd.score,
                            createdAt: rd['createdAt'],
                            _id: rd._id.toString()
                        })),
                        lastRecord: data.length > 0 ? data[data.length - 1]._id.toString() : null,
                    };
                    observer.next(result);
                    observer.complete();
                })
                .catch((err) => {
                    console.error('Error fetching game history:', err);
                    observer.error(err);
                });
        });
    }
    

    getTotalScore(user_id: string): Observable<number> {
        return from(
            this.gameHistoryModel.aggregate([
                { $match: { user_id: new Types.ObjectId(user_id) } },
                { $group: { _id: null, totalScore: { $sum: '$score' } } },
            ])
                .then(result => result.length > 0 ? result[0].totalScore : 0)
        );
    }

    save(createGameHistoryDto: CreateGameHistoryDto, userId: string, ip: string, userAgent: string): Observable<ResGameHistoryDto> {
        return this.gameProfileService.findById(userId).pipe(
            mergeMap((gameUser) => {
                if (!gameUser) {
                    throw new NotFoundException('User not found');
                }
                if (gameUser.remaining_play <= 0) {
                    throw new ForbiddenException('No remaining plays left');
                }

                const newGameHistory = new this.gameHistoryModel({
                    user_id: userId,
                    ip: ip,
                    browser: userAgent,
                    score: createGameHistoryDto.score,
                    data: createGameHistoryDto.data
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
                    catchError((err) => {
                        return of({
                            number_of_attempts: gameUser.number_of_attempts,
                            remaining_play: gameUser.remaining_play,
                            status: false,
                        } as ResGameHistoryDto);
                    })
                );
            }),
            catchError((err) => {
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

    getLastGameHistory(user_id: string): Observable<GameHistory | null> {
        return from(
            this.gameHistoryModel.findOne<GameHistoryDocument>({ user_id })
                .sort({ createdAt: -1 })
                .exec()
                .then((record) => {
                    if (!record) {
                        return null;
                    }
                    return record;
                })
        );
    }
}
