import { Module } from '@nestjs/common';
import { ReferralModule } from 'modules/referral/referral.module';
import { GameHistoryModule } from 'modules/game-history/game-history.module';
import { TaskHistoryModule } from 'modules/task-history/task-history.module';
import { GameProfileModule } from 'modules/game-profile/game-profile.module';
import { TelegramUserService } from './telegram-user.service';
import { TelegramUserController } from './telegram-user.controller';

@Module({
    imports: [
        ReferralModule,
        GameHistoryModule,
        TaskHistoryModule,
        GameProfileModule,
    ],
    providers: [TelegramUserService],
    exports: [TelegramUserService],
    controllers: [TelegramUserController],
})
export class TelegramUserModule {}
