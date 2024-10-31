export interface IMe {
    telegram_id: string;
    user_name: string;
    name: string;
    id: string;
    analytics: IAnalytics;
    game_info: IGameInfo;
}
interface IGameInfo {
    number_of_attempts: number;
    remaining_play: number;
    earned_points: number;
    duration: number;
}
interface IAnalytics {
    game_score: number;
    task_score: number;
    referral_score: number;
    total_referrals: number;
}
