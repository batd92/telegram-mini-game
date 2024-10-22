import { Inject, Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { USER_MODEL } from '../../database/constants';
import { User, UserDocument } from '../../database/schemas/user.schema';
import { TelegramUser } from 'modules/telegram/interfaces/telegram.interface';
import { ReferralService } from 'modules/referral/referral.service';
import { GameHistoryService } from 'modules/game-history/game-history.service';
import { TaskHistoryService } from 'modules/task-history/task-history.service';
import { GameUserService } from 'modules/game-user/game-user.service';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_MODEL) private userModel: Model<UserDocument>,
        private readonly referralService: ReferralService,
        private readonly gameHistoryService: GameHistoryService,
        private readonly taskHistoryService: TaskHistoryService,
        private readonly gameUserService: GameUserService

    ) { }

    findUserByTelegramId(username: string, telegram_id: string): Observable<User> {
        return from(this.userModel.findOne({ username, telegram_id }).exec());
    }
    

    async findByAuthReq(telegram_id: string): Promise<Partial<User>> {
        return this.userModel.findOne({ telegram_id }).exec()
    }    

    async findByUserId(id: string): Promise<any> {
        const user = await this.userModel.findOne({ _id: id }).exec();

        if (!user) {
            throw new Error('User not found');
        }

        const totalGameScore = await this.gameHistoryService.getTotalScore(id).toPromise();
        const totalTaskScore = await this.taskHistoryService.getTotalScore(id).toPromise();
        const { totalScore: referralScore, totalReferrals } = await this.referralService.getReferralStats(id).toPromise();
        const gameUserInfo = await this.gameUserService.getGameUserById(id).toPromise();

        return {
            user,
            totalGameScore,
            totalTaskScore,
            referralScore,
            totalReferrals,
            gameUserInfo,
        };
    }

    async register(data: TelegramUser): Promise<User> {
        console.log('TelegramUser ', data);

        try {
            const newUser = await this.userModel.create([{
                telegram_id: data.id.toString(),
                username: data.username,
                is_bot: data.is_bot,
                first_name: data.first_name,
                last_name: data.last_name,
                language_code: data.language_code,
                can_join_groups: data.can_join_groups,
                supports_inline_queries: data.supports_inline_queries,
                can_read_all_group_messages: data.can_read_all_group_messages,
                roles: 'USER',
                referral_code: data.referral_code
            }]);
    
            this.gameUserService.save({
                user_id: newUser[0]._id,
                number_of_attempts: 0,
                remaining_play: 5,
                score: 100,
            });
    
            if (data.referral_code) {
                this.referralService.save({
                    user_id: data.referral_code,
                    referred_user_id: newUser[0]._id,
                    score: 100,
                });
            }

            return newUser[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error(`User registration failed: ${error.message}`);
        }
    }
}
