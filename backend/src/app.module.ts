import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { LoggerModule } from './logger/logger.module';
import { TaskModule } from './modules/task/task.module';
import { GameUserModule } from 'modules/game-user/game-user.module';
import { GameHistoryModule } from 'modules/game-history/game-history.module';
import { ReferralModule } from 'modules/referral/referral.module';
import { TelegramModule } from 'modules/telegram/telegram.module';


@Module({
    imports: [
        ConfigModule.forRoot({ ignoreEnvFile: true }),
        EventEmitterModule.forRoot(),
        DatabaseModule,
        TelegramModule,
        UserModule,
        AuthModule,
        TaskModule,
        GameUserModule,
        GameHistoryModule,
        ReferralModule,
        LoggerModule.forRoot(),
    ],
    providers: [

    ]
})
export class AppModule { }
