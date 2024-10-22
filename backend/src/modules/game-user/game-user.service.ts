import { Inject, Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { GAME_USER_MODEL } from 'database/constants';
import { GameUser, GameUserDocument } from 'database/schemas/game-user.schema';
import { CreateGameUserDto } from './dto/create-game-user.dto';

@Injectable({ scope: Scope.DEFAULT })
export class GameUserService {
    constructor(
        @Inject(GAME_USER_MODEL) private readonly gameUserModel: Model<GameUser>,
    ) {
        console.log('GameUserService initialized ...');
    }

    getGameUserById(user_id: string): Observable<GameUserDocument | null> {
        return from(
            this.gameUserModel.findOne({ user_id })
                .populate('user_id', '_id username telegram_id')
                .exec()
        );
    }

    save(createGameUserDto: CreateGameUserDto): Observable<GameUser> {
        const newGameUser = new this.gameUserModel(createGameUserDto);
        return from(newGameUser.save());
    }

    addNumberOfAttempts(userId: string): void {
        this.gameUserModel.findOneAndUpdate(
            { user_id: userId },
            { $inc: { number_of_attempts: 1 } },
            { new: true }
        ).exec();
    }

    addRemainingPlay(userId: string, playCount: number): void {
        this.gameUserModel.findOneAndUpdate(
            { user_id: userId },
            { $set: { remaining_play: playCount } },
            { new: true }
        ).exec();
    }
}
