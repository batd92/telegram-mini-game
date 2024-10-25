export interface IMe {
    _id: string;
    telegram_id: string;
    user_name: string;
    first_name: string;
    language_code: string;
    id: string;
    analytics: IAnalytics,
    game_info: IGameInfo
}

interface IGameInfo {
    number_of_attempts: number;
    remaining_play: number;
    earned_points: number;
}

interface IAnalytics {
    game_score: number;
    task_score: number;
    referral_score: number;
    total_referrals: number;
}
