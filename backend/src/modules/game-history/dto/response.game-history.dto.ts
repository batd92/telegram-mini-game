export class ResGameHistoryDto {
    readonly number_of_attempts: number;
    readonly remaining_play: number;
    readonly status: boolean;
}


export class ResListGameHistoryDto {
    readonly score: number;
    readonly createdAt: string;
    readonly _id: string;
}