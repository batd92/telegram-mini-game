import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { TelegramUser } from '../models/telegram-user.model';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    serializeUser(
        user: TelegramUser,
        done: (err: Error | null, id?: TelegramUser) => void,
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
