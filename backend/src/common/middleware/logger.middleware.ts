import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'logger/logger.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: LoggerService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const requestId = uuidv4();
        const ip = req.ip;
        const userAgent = req.headers['user-agent'];
        const startTime = Date.now();
        const requestTime = new Date().toISOString();

        this.logger.log(`Request ID: ${requestId} - Received at: ${requestTime} - Incoming request: ${req.method} ${req.url} - IP: ${ip} - User-Agent: ${userAgent}`);

        res.on('finish', () => {
            const duration = Date.now() - startTime;
            const statusCode = res.statusCode;
            this.logger.log(`Request ID: ${requestId} - Response: ${statusCode} - Duration: ${duration}ms`);
        });

        next();
    }
}
