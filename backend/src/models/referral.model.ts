import { Referral as PrismaReferral } from '@prisma/client';

export class Referral implements PrismaReferral {
    id: string;
    user_id: string;
    referred_user_id: string;
    score: number;
    created_at: Date;
    updated_at: Date;
}
