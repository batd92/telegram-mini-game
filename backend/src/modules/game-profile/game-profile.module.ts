import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { GameProfileService } from './game-profile.service';
import { GameProfileController } from './game-profile.controller';
import { GameHistoryModule } from 'modules/game-history/game-history.module';
import { GameHistoryService } from 'modules/game-history/game-history.service';

@Module({
    imports: [
        DatabaseModule,
        forwardRef(() => GameHistoryModule)
    ],
    controllers: [GameProfileController],
    providers: [GameProfileService, GameHistoryService],
    exports: [GameProfileService]
})
export class GameProfileModule { }
