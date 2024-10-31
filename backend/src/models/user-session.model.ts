import {
    UserSession as PrismaUserSession,
    OS,
    StatusAppUser,
} from '@prisma/client';

export class UserSession implements PrismaUserSession {
    id: string;
    user_id: string;
    device_id: string;
    firebase_token: string;
    os: OS;
    status: StatusAppUser;
    created_at: Date;
    updated_at: Date;
}
