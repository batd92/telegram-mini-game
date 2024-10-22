import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ReferralController } from './referral.controller';
import { ReferralService } from './referral.service';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [ReferralController],
    providers: [ReferralService],
    exports: [ReferralService]
})
export class ReferralModule { }
