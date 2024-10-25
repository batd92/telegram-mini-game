import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { DatabaseModule } from 'database/database.module';
import { TelegramUserModule } from 'modules/telegram-user/telegram-user.module';

@Module({
    imports: [
        DatabaseModule,
        TelegramUserModule
    ],
    providers: [TelegramService],
    exports: [TelegramService],
})
export class TelegramModule { }
