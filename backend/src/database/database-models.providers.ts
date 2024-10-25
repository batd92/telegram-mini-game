import { Connection } from 'mongoose';
import {
    USER_MODEL,
    GAME_HISTORY_MODEL,
    TASK_MODEL,
    TASK_HISTORY_MODEL,
    REFERRAL_MODEL,
    GAME_PROFILE_MODEL,
    TELEGRAM_USER_MODEL,
    DATABASE_CONNECTION,
} from './constants';

import { GameHistorySchema } from './schemas/game-history.schema';
import { TaskSchema } from './schemas/task.schema';
import { TaskHistorySchema } from './schemas/task-history.schema';
import { ReferralSchema } from './schemas/referral.schema';
import { GameProfileSchema } from './schemas/game-profile.schema';
import { TelegramUserSchema } from './schemas/telegram-user.schema';
import { UserSchema } from './schemas/user.schema';

export const databaseModelsProviders = [
    {
        provide: USER_MODEL,
        useFactory: (connection: Connection) => connection.model('User', UserSchema),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: TELEGRAM_USER_MODEL,
        useFactory: (connection: Connection) => connection.model('TelegramUser', TelegramUserSchema),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: GAME_HISTORY_MODEL,
        useFactory: (connection: Connection) => connection.model('GameHistory', GameHistorySchema),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: TASK_MODEL,
        useFactory: (connection: Connection) => connection.model('Task', TaskSchema),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: TASK_HISTORY_MODEL,
        useFactory: (connection: Connection) => connection.model('TaskHistory', TaskHistorySchema),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: REFERRAL_MODEL,
        useFactory: (connection: Connection) => connection.model('Referral', ReferralSchema),
        inject: [DATABASE_CONNECTION],
    },
    {
        provide: GAME_PROFILE_MODEL,
        useFactory: (connection: Connection) => connection.model('GameProfile', GameProfileSchema),
        inject: [DATABASE_CONNECTION],
    },
];
