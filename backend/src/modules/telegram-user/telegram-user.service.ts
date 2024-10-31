import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IMe } from './dto/response.dto';
import { TelegramUser } from 'models/telegram-user.model';
import { ITelegramUser } from '@modules/telegram/interfaces/telegram.interface';

@Injectable()
export class TelegramUserService {
    constructor(private readonly prisma: PrismaService) {}

    async findByUsernameAndTelegramId(user_name: string, telegram_id: string) {
        return this.prisma.telegramUser.findFirst({
            where: {
                user_name: user_name,
                telegram_id: telegram_id,
            },
        });
    }

    async findByAuthReq(telegram_id: string): Promise<Partial<TelegramUser>> {
        return this.prisma.telegramUser.findUnique({
            where: { telegram_id },
        });
    }

    async findByUserId(id: string): Promise<{ data: IMe }> {
        const user = await this.prisma.telegramUser.findUnique({
            where: { id },
            include: {
                gameHistories: true,
                taskHistories: true,
                gameProfiles: true,
                referrals: true,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        const totalGameScore = await this.prisma.gameHistory.aggregate({
            where: { user_id: user.id },
            _sum: { score: true },
        });

        const totalTaskScore = await this.prisma.taskHistory.aggregate({
            where: { user_id: user.id },
            _sum: { score: true },
        });

        const referralsData = await this.prisma.referral.findMany({
            where: { user_id: id },
        });

        const gameInfo = await this.prisma.gameProfile.findFirst({
            where: { user_id: id },
        });

        return {
            data: {
                telegram_id: user.telegram_id,
                user_name: user.user_name,
                name: user.name,
                id: user.id,
                analytics: {
                    game_score: totalGameScore._sum.score || 0,
                    task_score: totalTaskScore._sum.score || 0,
                    referral_score: referralsData.length * 100,
                    total_referrals: referralsData.length,
                },
                game_info: gameInfo || {
                    number_of_attempts: 0,
                    remaining_play: 0,
                    earned_points: 0,
                    duration: 0,
                },
            },
        };
    }

    async register(data: ITelegramUser): Promise<TelegramUser> {
        console.log('user telegram ', data);

        return await this.prisma.$transaction(async (prisma) => {
            const newTelegramUser = await prisma.telegramUser.create({
                data: {
                    telegram_id: data.id.toString(),
                    user_name: data.user_name,
                    is_bot: data.is_bot,
                    name: data.first_name,
                    language_code: data.language_code,
                    referral_code: data.referral_code || undefined,
                },
            });

            await prisma.gameProfile.create({
                data: {
                    user_id: newTelegramUser.id,
                    number_of_attempts: 0,
                    remaining_play: 5,
                    earned_points: 100,
                },
            });

            if (data.referral_code) {
                await prisma.referral.create({
                    data: {
                        user_id: data.referral_code,
                        referred_user_id: newTelegramUser.id,
                        score: 100,
                    },
                });
            }

            return newTelegramUser;
        });
    }
}
