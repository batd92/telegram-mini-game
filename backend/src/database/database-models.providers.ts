import { Connection } from 'mongoose';
import {
    USER_MODEL,
    GAME_HISTORY_MODEL,
    TASK_MODEL,
    TASK_HISTORY_MODEL,
    REFERRAL_MODEL,
    GAME_USER_MODEL,
    DATABASE_CONNECTION,
} from './constants';

import { UserSchema } from './schemas/user.schema';
import { GameHistorySchema } from './schemas/game-history.schema';
import { TaskSchema } from './schemas/task.schema';
import { TaskHistorySchema } from './schemas/task-history.schema';
import { ReferralSchema } from './schemas/referral.schema';
import { GameUserSchema } from './schemas/game-user.schema';

export const databaseModelsProviders = [
    {
        provide: USER_MODEL,
        useFactory: (connection: Connection) => connection.model('User', UserSchema),
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
        provide: GAME_USER_MODEL,
        useFactory: (connection: Connection) => connection.model('GameUser', GameUserSchema),
        inject: [DATABASE_CONNECTION],
    },
];
