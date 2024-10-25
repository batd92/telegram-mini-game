import { IsNotEmpty } from 'class-validator';

export class CreateGameProfileDto {
    @IsNotEmpty()
    readonly number_of_attempts: number;

    @IsNotEmpty()
    readonly remaining_play: number;

    @IsNotEmpty()
    readonly user_id: string;

    @IsNotEmpty()
    readonly score: number;
}