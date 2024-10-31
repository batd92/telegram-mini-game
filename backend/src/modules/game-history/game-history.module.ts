import { forwardRef, Module } from '@nestjs/common';
import { GameHistoryController } from './game-history.controller';
import { GameHistoryService } from './game-history.service';
import { GameProfileModule } from 'modules/game-profile/game-profile.module';

@Module({
    imports: [],
    controllers: [GameHistoryController],
    providers: [GameHistoryService],
    exports: [GameHistoryService],
})
export class GameHistoryModule {}
