export class ResGameHistoryDto {
    readonly number_of_attempts: number;
    readonly remaining_play: number;
    readonly status: boolean;
}

export class ResListGameHistoryDto {
    readonly score: number;
    readonly created_at: string;
    readonly _id: string;
}
