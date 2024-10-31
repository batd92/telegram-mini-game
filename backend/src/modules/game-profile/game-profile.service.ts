import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { from, Observable } from 'rxjs';
import { CreateGameProfileDto } from './dto/request.dto';
import { GameProfile } from '@prisma/client';

@Injectable()
export class GameProfileService {
    constructor(private readonly prisma: PrismaService) {
        console.log('GameProfileService initialized ...');
    }

    findById(user_id: string): Observable<GameProfile | null> {
        return from(
            this.prisma.gameProfile.findFirst({
                where: { user_id: user_id },
                include: {
                    user: {
                        select: {
                            id: true,
                            user_name: true,
                            telegram_id: true,
                        },
                    },
                },
            }),
        );
    }

    getGameProfiler(user_id: string): Observable<GameProfile | null> {
        return from(
            this.prisma.$transaction(async (prisma) => {
                const gameProfile = await prisma.gameProfile.findFirst({
                    where: { user_id: user_id },
                });

                if (!gameProfile) {
                    return null;
                }

                if (gameProfile.remaining_play <= 0) {
                    const lastGameHistory = await prisma.gameHistory.findFirst({
                        where: { user_id: user_id },
                    });

                    if (!lastGameHistory) {
                        return gameProfile;
                    }

                    const timeSinceLastGame =
                        new Date().getTime() -
                        new Date(lastGameHistory.created_at).getTime();
                    const newRemainingPlay = Math.floor(
                        timeSinceLastGame / (10 * 60 * 1000),
                    );

                    const updatedGameProfile = await prisma.gameProfile.update({
                        where: { id: gameProfile.id },
                        data: {
                            remaining_play: Math.min(newRemainingPlay, 5),
                        },
                    });

                    return {
                        ...updatedGameProfile,
                        remaining_play: Math.min(newRemainingPlay, 5),
                    };
                }

                return gameProfile;
            }),
        );
    }

    save(createGameUserDto: CreateGameProfileDto): Observable<GameProfile> {
        return from(
            this.prisma.gameProfile.create({
                data: createGameUserDto,
            }),
        );
    }
}
