import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { from, map, Observable } from 'rxjs';
import { CreateReferralDto } from './dto/request.dto';
import { ReferredUser } from './dto/response.dto';

@Injectable()
export class ReferralService {
    constructor(private readonly prisma: PrismaService) {
        console.log('ReferralService initialized ...');
    }

    getReferralStats(user_id: string): Observable<{ data: ReferredUser[] }> {
        return from(
            this.prisma.referral.findMany({
                where: { user_id: user_id },
                include: {
                    referred_user: {
                        select: {
                            id: true,
                            user_name: true,
                            telegram_id: true,
                        },
                    },
                },
            }),
        ).pipe(
            map((result) => {
                const referredUsers = result.map((referral) => ({
                    _id: referral.referred_user.id,
                    user_name: referral.referred_user.user_name,
                    telegram_id: referral.referred_user.telegram_id,
                }));
                return { data: referredUsers };
            }),
        );
    }

    save(refef: CreateReferralDto): Observable<void> {
        return from(this.prisma.referral.create({ data: refef })).pipe(
            map(() => undefined),
        );
    }
}
