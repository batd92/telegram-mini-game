import { Inject, Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CreateGameProfileDto } from './dto/create-game-user.dto';
import { GAME_PROFILE_MODEL } from 'database/constants';
import { GameProfile, GameProfileDocument } from 'database/schemas/game-profile.schema';

@Injectable({ scope: Scope.DEFAULT })
export class GameProfileService {
    constructor(
        @Inject(GAME_PROFILE_MODEL) private readonly gameProfileModel: Model<GameProfile>,
    ) {
        console.log('GameProfileService initialized ...');
    }

    getGameUserById(user_id: string): Observable<GameProfileDocument | null> {
        return from(
            this.gameProfileModel.findOne({ user_id })
                .populate('user_id', '_id user_name telegram_id')
                .exec()
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
