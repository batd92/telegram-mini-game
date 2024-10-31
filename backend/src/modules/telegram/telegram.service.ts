import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Telegraf, Context } from 'telegraf';
import axios from 'axios';
import { ITelegramUser } from './interfaces/telegram.interface';
import { TelegramUserService } from 'modules/telegram-user/telegram-user.service';
const FRONTEND_BASE_URL =
    process.env.FRONTEND_BASE_URL || 'http://localhost:4000';
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
    private bot: Telegraf<Context>;
    private readonly token: string =
        process.env.TELEGRAM_BOT_TOKEN ||
        '7363203830:AAE1fgOfeZCQ5cxtUpuFylgdM3qvFoEi4fA';

    constructor(private readonly telegramUserService: TelegramUserService) {
        this.bot = new Telegraf<Context>(this.token);
    }

    onModuleInit() {
        this.startListening();
    }

    onModuleDestroy() {
        this.stopListening();
    }

    private startListening() {
        this.bot.command('start', (ctx) => this.handleStartCommand(ctx));
        this.bot.command('play', (ctx) => this.handlePlayCommand(ctx));
        this.bot.command('help', (ctx) =>
            ctx.reply('Here are the commands you can use: /start, /help'),
        );

        this.bot.launch();
    }

    private stopListening() {
        this.bot.stop('SIGINT');
    }

    private async handleStartCommand(ctx: any) {
        const user: ITelegramUser = ctx.from;
        user.user_name = ctx.from.username;

        const messageText = ctx.message?.text;

        if (!messageText) {
            await ctx.reply('No message text found.');
            return;
        }

        const urlParams = new URLSearchParams(messageText.split(' ')[1]);
        const referralCode = urlParams.get('startApp')?.replace('ref_', '');

        if (referralCode) {
            user.referral_code = referralCode;
        }

        try {
            const telegramUser =
                (await this.telegramUserService.findByAuthReq(
                    user.id.toString(),
                )) || (await this.telegramUserService.register(user));

            // Login
            const tokenResponse = await axios.post(
                API_BASE_URL + '/v1/auth/login',
                {
                    user_name: telegramUser.user_name,
                    telegram_id: user.id,
                    roles: telegramUser.roles,
                    id: telegramUser.id,
                },
            );

            const token = tokenResponse.data.access_token;

            const websiteUrl = `${FRONTEND_BASE_URL}?token=${token}`;
            console.log('websiteUrl', websiteUrl);
            await ctx.reply(`Click the button below to play:`, {
                reply_markup: {
                    inline_keyboard: [[{ text: 'Open Game', url: websiteUrl }]],
                },
            });
        } catch (error) {
            console.error('Error handling start command:', error);
            await ctx.reply(
                'An error occurred while processing your request. Please try again later.',
            );
        }
    }

    private async handlePlayCommand(ctx: Context) {
        await ctx.reply(`Play Game`);
    }

    async sendMessage(chatId: string, message: string): Promise<void> {
        await this.bot.telegram.sendMessage(chatId, message);
    }
}
