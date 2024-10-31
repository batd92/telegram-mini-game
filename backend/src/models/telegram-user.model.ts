import { TelegramUser as PrismaTelegramUser, RoleType } from '@prisma/client';

export class TelegramUser implements PrismaTelegramUser {
    id: string;
    is_bot: boolean;
    telegram_id: string;
    user_name: string;
    name: string;
    language_code: string;
    can_join_groups: boolean;
    supports_inline_queries: boolean;
    can_read_all_group_messages: boolean;
    referral_code: string;
    roles: RoleType[];
    created_at: Date;
    updated_at: Date;
    delete_at: Date;
}
