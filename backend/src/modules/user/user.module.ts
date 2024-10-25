import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [
        UserService,
    ],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {}
