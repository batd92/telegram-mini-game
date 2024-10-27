import { Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';
import * as fs from 'fs';

@Injectable({
    scope: Scope.TRANSIENT,
})
export class LoggerService {
    private logger: winston.Logger;
    private prefix?: string;

    constructor() {
        const logDir = path.join(__dirname, '..', '..', 'logs');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
        const transport = new winston.transports.DailyRotateFile({
            filename: path.join(logDir, '%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        });

        this.logger = winston.createLogger({
            transports: [transport],
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        });

        this.logger.info('LoggerService initialized.');
    }

    log(message: string) {
        let formattedMessage = message;

        if (this.prefix) {
            formattedMessage = `[${this.prefix}] ${message}`;
        }

        this.logger.info(formattedMessage);
    }

    setPrefix(prefix: string) {
        this.prefix = prefix;
    }
}
