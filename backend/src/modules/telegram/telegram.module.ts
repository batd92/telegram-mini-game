import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramUserModule } from 'modules/telegram-user/telegram-user.module';

@Module({
    imports: [TelegramUserModule],
    providers: [TelegramService],
    exports: [TelegramService],
})
export class TelegramModule {}
