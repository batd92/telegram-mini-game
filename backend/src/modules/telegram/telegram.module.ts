import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { DatabaseModule } from 'database/database.module';
import { UserModule } from 'modules/user/user.module';

@Module({
    imports: [
        DatabaseModule,
        UserModule
    ],
    providers: [TelegramService],
    exports: [TelegramService],
})
export class TelegramModule { }
