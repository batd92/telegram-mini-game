import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './auth/auth.module';
import { TelegramUserModule } from './modules/telegram-user/telegram-user.module';
import { LoggerModule } from './logger/logger.module';
import { TaskModule } from './modules/task/task.module';
import { GameUserModule } from 'modules/game-profile/game-profile.module';
import { GameHistoryModule } from 'modules/game-history/game-history.module';
import { ReferralModule } from 'modules/referral/referral.module';
import { TelegramModule } from 'modules/telegram/telegram.module';
import { UserModule } from 'modules/user/user.module';
import { DataInitializerService } from 'initializers/data.initializer';


@Module({
    imports: [
        ConfigModule.forRoot({ ignoreEnvFile: true }),
        EventEmitterModule.forRoot(),
        DatabaseModule,
        TelegramModule,
        UserModule,
        TelegramUserModule,
        AuthModule,
        TaskModule,
        GameUserModule,
        GameHistoryModule,
        ReferralModule,
        LoggerModule.forRoot(),
    ],
    providers: [
        DataInitializerService
    ]
})
export class AppModule { }
