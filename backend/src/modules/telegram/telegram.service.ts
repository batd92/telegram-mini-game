import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Telegraf, Context } from 'telegraf';
import axios from 'axios';
import { TelegramUser } from './interfaces/telegram.interface';
import { UserService } from 'modules/user/user.service';

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
    private bot: Telegraf<Context>;
    private readonly token: string = process.env.TELEGRAM_BOT_TOKEN || '7363203830:AAE1fgOfeZCQ5cxtUpuFylgdM3qvFoEi4fA';

    constructor(
        private readonly userService: UserService
    ) {
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
        this.bot.command('help', (ctx) => ctx.reply('Here are the commands you can use: /start, /help'));

        this.bot.launch();
    }

    private stopListening() {
        this.bot.stop('SIGINT');
    }

    private async handleStartCommand(ctx: any) {
        const user: TelegramUser = ctx.from;
        const messageText = ctx.message?.text;

        if (!messageText) {
            await ctx.reply('No message text found.');
            return;
        }

        const args = messageText.split(' ');

        if (args.length > 1) {
            user.referral_code = args[1].replace('ref_', '');
        }

        try {
            const userTelegram = await this.userService.findByAuthReq(user.id.toString());
            if (!userTelegram) {
                await this.userService.register(user);
            }

            // Login
            const tokenResponse = await axios.post('http://localhost:3000/auth/login', {
                username: user.username,
                telegram_id: user.id
            });

            const token = tokenResponse.data.access_token;

            const websiteUrl = `https://your-website.com?token=${token}`;
            await ctx.reply(`Click the button below to play:`, {
                reply_markup: {
                    inline_keyboard: [[
                        { text: 'Open Game', url: websiteUrl },
                    ]],
                },
            });
        } catch (error) {
            console.error('Error handling start command:');
            await ctx.reply('An error occurred while processing your request. Please try again later.');
        }
    }

    private async handlePlayCommand(ctx: Context) {
        const user: TelegramUser = ctx.from;
        const webPageUrl = `https://your-website.com/login?token=${1233}`;

        await ctx.reply(`Opening your game page: ${webPageUrl}`);
    }

    async sendMessage(chatId: string, message: string): Promise<void> {
        await this.bot.telegram.sendMessage(chatId, message);
    }
}
