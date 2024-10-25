import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { GameProfileService } from './game-profile.service';
import { GameProfileController } from './game-profile.controller';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [GameProfileController],
    providers: [GameProfileService],
    exports: [GameProfileService]
})
export class GameUserModule { }
