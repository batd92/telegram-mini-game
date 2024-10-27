import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { GameHistoryController } from './game-history.controller';
import { GameHistoryService } from './game-history.service';
import { GameProfileModule } from 'modules/game-profile/game-profile.module';


@Module({
    imports: [
        DatabaseModule,
        forwardRef(() => GameProfileModule),
    ],
    controllers: [GameHistoryController],
    providers: [GameHistoryService],
    exports: [GameHistoryService]
})
export class GameHistoryModule { }
