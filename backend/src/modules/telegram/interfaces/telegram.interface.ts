export interface ITelegramUser {
    id: number;
    is_bot: boolean;
    first_name: string;
    user_name: string;
    language_code?: string;
    referral_code?: string;
}
