import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './auth/auth.module';
import { TelegramUserModule } from './modules/telegram-user/telegram-user.module';
import { LoggerModule } from './logger/logger.module';
import { TaskModule } from './modules/task/task.module';
import { GameProfileModule } from 'modules/game-profile/game-profile.module';
import { GameHistoryModule } from 'modules/game-history/game-history.module';
import { ReferralModule } from 'modules/referral/referral.module';
import { TelegramModule } from 'modules/telegram/telegram.module';
import { UserModule } from 'modules/user/user.module';
import { DataInitializerService } from 'initializers/data.initializer';
import { LoggerMiddleware } from 'common/middleware/logger.middleware';


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
        GameProfileModule,
        GameHistoryModule,
        ReferralModule,
        LoggerModule.forRoot(),
    ],
    providers: [
        DataInitializerService
    ]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*');
    }
}
