import { Inject, Injectable, Scope } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { REFERRAL_MODEL } from 'database/constants';
import { Referral } from 'database/schemas/referral.schema';
import { CreateReferralDto } from './dto/create-referral.dto';
import { ReferredUser } from './dto/response.referral.dto';

@Injectable()
export class ReferralService {
    constructor(
        @Inject(REFERRAL_MODEL) private referralModel: Model<Referral>,
    ) {
        console.log('ReferralService initialized ...');
    }

    getReferralStats(user_id: string): Observable<{ data: ReferredUser[] }> {
        return from(
            this.referralModel.aggregate([
                { $match: { user_id: new Types.ObjectId(user_id)}},
                {
                    $group: {
                        _id: null,
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
                        referredUsers: { $map: {
                            input: '$referredUserDetails',
                            as: 'user',
                            in: {
                                _id: '$$user._id',
                                user_name: '$$user.user_name',
                                telegram_id: '$$user.telegram_id'
                            }
                        }}
                    }
                }
            ]).exec()
        ).pipe(
            map((result) => {
                const referredUsers = result.length > 0 ? result[0].referredUsers : [];
                return { data: referredUsers  };
            })
        );
    }

    save(refef: CreateReferralDto): void {
        this.referralModel.create(refef);
    }
}
