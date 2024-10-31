import { GameHistory as PrismaGameHistory } from '@prisma/client';

export class GameHistory implements PrismaGameHistory {
    id: string;
    user_id: string;
    score: number;
    ip: string;
    browser: string;
    data: string;
    created_at: Date;
    updated_at: Date;
}
