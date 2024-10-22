import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { User } from '../database/schemas/user.schema';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    serializeUser(
        user: User,
        done: (err: Error | null, id?: User) => void,
    ): void {
        //delete user.password;
        done(null, user);
    }

    deserializeUser(
        payload: unknown,
        done: (err: Error | null, payload?: unknown) => void,
    ): void {
        done(null, payload);
    }
}
