import { Inject, Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { REFERRAL_MODEL } from 'database/constants';
import { Referral } from 'database/schemas/referral.schema';
import { CreateReferralDto } from './dto/create-referral.dto';

@Injectable()
export class ReferralService {
    constructor(
        @Inject(REFERRAL_MODEL) private referralModel: Model<Referral>,
    ) {
        console.log('ReferralService initialized ...');
    }

    getReferralStats(user_id: string): Observable<{ totalScore: number; totalReferrals: number; referredUsers: any[] }> {
        return from(
            this.referralModel.aggregate([
                { $match: { user_id: user_id } },
                {
                    $group: {
                        _id: null,
                        totalScore: { $sum: '$score' },
                        totalReferrals: { $count: {} },
                        referredUsers: { $push: '$referred_user_id' }
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'referredUsers',
                        foreignField: '_id',
                        as: 'referredUserDetails'
                    }
                },
                {
                    $project: {
                        _id: 0,
                        totalScore: 1,
                        totalReferrals: 1,
                        referredUsers: { $map: {
                            input: '$referredUserDetails',
                            as: 'user',
                            in: {
                                _id: '$$user._id',
                                username: '$$user.username',
                                telegram_id: '$$user.telegram_id'
                            }
                        }}
                    }
                }
            ]).exec()
        ).pipe(
            map((result) => {
                return result.length > 0 ? result[0] : { totalScore: 0, totalReferrals: 0, referredUsers: [] };
            })
        );
    }

    save(refef: CreateReferralDto): void {
        this.referralModel.create(refef);
    }
}
