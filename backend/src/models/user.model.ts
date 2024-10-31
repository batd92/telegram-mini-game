import { User as PrismaUser, RoleType } from '@prisma/client';

export class User implements PrismaUser {
    id: string;
    user_name: string;
    password: string;
    name: string;
    roles: RoleType[];
    created_at: Date;
    updated_at: Date;
    delete_at: Date | null;
}
