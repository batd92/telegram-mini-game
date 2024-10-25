export interface ITelegramUser {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    user_name?: string;
    language_code?: string;
    can_join_groups?: boolean;
    can_read_all_group_messages?: boolean;
    supports_inline_queries?: boolean;
    referral_code?: string;
}
