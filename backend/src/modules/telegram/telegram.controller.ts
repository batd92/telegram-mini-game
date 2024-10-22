import { Controller, Get } from '@nestjs/common';

@Controller('telegram')
export class TelegramController {
    @Get('health')
    getHealth() {
        return { status: 'Telegram bot is running!' };
    }
}