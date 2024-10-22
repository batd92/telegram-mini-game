import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { GameUserService } from './game-user.service';
import { GameUserController } from './game-user.controller';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [GameUserController],
    providers: [GameUserService],
    exports: [GameUserService]
})
export class GameUserModule { }
