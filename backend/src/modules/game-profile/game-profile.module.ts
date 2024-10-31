import { Module } from '@nestjs/common';
import { GameProfileService } from './game-profile.service';
import { GameProfileController } from './game-profile.controller';

@Module({
    imports: [],
    controllers: [GameProfileController],
    providers: [GameProfileService],
    exports: [GameProfileService],
})
export class GameProfileModule {}
