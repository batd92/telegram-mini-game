import { RoleType } from 'shared/enum/role-type.enum';

export interface JwtPayload {
    readonly upn: string;
    readonly sub: string;
    readonly telegram_id: string;
    readonly roles: RoleType[];
}
