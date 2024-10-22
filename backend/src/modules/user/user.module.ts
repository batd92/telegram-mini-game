import { Module } from '@nestjs/common';
import { DataInitializerService } from '../../initializers/data.initializer';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../../database/database.module';
import { ReferralModule } from 'modules/referral/referral.module';
import { GameHistoryModule } from 'modules/game-history/game-history.module';
import { TaskHistoryModule } from 'modules/task-history/task-history.module';
import { GameUserModule } from 'modules/game-user/game-user.module';

@Module({
    imports: [
        DatabaseModule,
        ReferralModule,
        GameHistoryModule,
        TaskHistoryModule,
        GameUserModule,
    ],
    providers: [
        UserService,
    ],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}
