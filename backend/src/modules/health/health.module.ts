import { Global, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import HealthController from '@modules/health/health.controller';


@Global()
@Module({
    providers: [TerminusModule],
    exports: [HealthController],
})
export class HealthModule {}