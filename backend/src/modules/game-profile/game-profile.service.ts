import { forwardRef, Inject, Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
import { from, map, mergeMap, Observable, of } from 'rxjs';
import { CreateGameProfileDto } from './dto/create-game-user.dto';
import { GAME_PROFILE_MODEL } from 'database/constants';
import { GameProfile, GameProfileDocument } from 'database/schemas/game-profile.schema';
import { GameHistoryService } from 'modules/game-history/game-history.service';

@Injectable()
export class GameProfileService {
    constructor(
        @Inject(GAME_PROFILE_MODEL) private gameProfileModel: Model<GameProfile>,
        @Inject(forwardRef(() => GameHistoryService)) private readonly gameHistoryService: GameHistoryService
    ) {
        console.log('GameProfileService initialized ...');
    }

    findById(user_id: string): Observable<GameProfileDocument | null> {
        return from(
            this.gameProfileModel.findOne({ user_id })
                .populate('user_id', '_id user_name telegram_id')
                .exec()
        );
    }

    getGameProfiler(user_id: string): Observable<GameProfileDocument | null> {
        return from(
            this.gameProfileModel.findOne({ user_id }).exec()
        ).pipe(
            mergeMap((gameProfile) => {
                if (!gameProfile) {
                    return of(null);
                }

                if (gameProfile.remaining_play <= 0) {
                    return this.gameHistoryService.getLastGameHistory(user_id).pipe(
                        mergeMap((lastGameHistory) => {
                            if (!lastGameHistory) {
                                return of(gameProfile);
                            }

                            const timeSinceLastGame = new Date().getTime() - new Date(lastGameHistory['createdAt']).getTime();
                            const newRemainingPlay = Math.floor(timeSinceLastGame / (10 * 1000));

                            if (newRemainingPlay > 0) {
                                gameProfile.remaining_play = Math.min(newRemainingPlay, 5);;
                            }

                            return from(gameProfile.save()).pipe(
                                map(() => gameProfile)
                            );
                        })
                    );
                }

                return of(gameProfile);
            })
        );
    }

    save(createGameUserDto: CreateGameProfileDto): Observable<GameProfile> {
        const newGameUser = new this.gameProfileModel(createGameUserDto);
        return from(newGameUser.save());
    }

    addNumberOfAttempts(userId: string): void {
        this.gameProfileModel.findOneAndUpdate(
            { user_id: userId },
            { $inc: { number_of_attempts: 1 } },
            { new: true }
        ).exec();
    }

    addRemainingPlay(userId: string, playCount: number): void {
        this.gameProfileModel.findOneAndUpdate(
            { user_id: userId },
            { $set: { remaining_play: playCount } },
            { new: true }
        ).exec();
    }
}
