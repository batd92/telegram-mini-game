import { IsNotEmpty } from 'class-validator';
export class CreateReferralDto {
    @IsNotEmpty()
    readonly user_id: string;

    @IsNotEmpty()
    readonly referred_user_id: string;

    @IsNotEmpty()
    readonly score: number;
}
