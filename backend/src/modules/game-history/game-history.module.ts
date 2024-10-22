import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { GameHistoryController } from './game-history.controller';
import { GameHistoryService } from './game-history.service';
import { GameUserService } from 'modules/game-user/game-user.service';
import { GameUserModule } from 'modules/game-user/game-user.module';


@Module({
    imports: [
        DatabaseModule,
        GameUserModule
    ],
    controllers: [GameHistoryController],
    providers: [GameHistoryService],
    exports: [GameHistoryService]
})
export class GameHistoryModule { }
