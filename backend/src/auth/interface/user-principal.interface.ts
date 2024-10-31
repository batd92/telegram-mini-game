import { RoleType } from 'shared/enum/role-type.enum';

export interface UserPrincipal {
    readonly user_name: string;
    readonly id: string;
    readonly telegram_id: string;
    readonly roles: RoleType[];
}
