import { Controller, Get } from '@nestjs/common';
import {
    HealthCheck,
    HealthCheckService,
    MemoryHealthIndicator,
    DiskHealthIndicator,
    HealthCheckResult,
} from '@nestjs/terminus';
import { SkipAuth } from 'auth/guard/skip-auth.guard';

@Controller('health')
export default class HealthController {
    constructor(
        private health: HealthCheckService,
        private memory: MemoryHealthIndicator,
        private readonly disk: DiskHealthIndicator,
    ) {}

    @Get()
    @SkipAuth()
    @HealthCheck()
    check(): Promise<HealthCheckResult> {
        return this.health.check([
            () => ({ info: { status: 'up', message: 'Everything is fine' } }),
        ]);
    }

    @Get('memory')
    @SkipAuth()
    @HealthCheck()
    checkMemory(): Promise<HealthCheckResult> {
        return this.health.check([
            () => this.memory.checkHeap('memory_heap', 1400 * 1024 * 1024),
        ]);
    }

    @Get('disk')
    @SkipAuth()
    @HealthCheck()
    checkDisk(): Promise<HealthCheckResult> {
        return this.health.check([
            () =>
                this.disk.checkStorage('storage', {
                    path: '/',
                    thresholdPercent: 0.8,
                }),
        ]);
    }
}
