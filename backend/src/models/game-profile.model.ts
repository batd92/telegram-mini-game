import { GameProfile as PrismaGameProfile } from '@prisma/client';

export class GameProfile implements PrismaGameProfile {
    id: string;
    user_id: string;
    number_of_attempts: number;
    remaining_play: number;
    earned_points: number;
    duration: number;
    created_at: Date;
    updated_at: Date;
}
