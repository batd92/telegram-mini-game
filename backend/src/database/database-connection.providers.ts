import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from './constants';
import mongodbConfig from 'config/mongodb.config';
import { ConfigType } from '@nestjs/config';

export const databaseProviders = [
    {
        provide: DATABASE_CONNECTION,
        useFactory: (dbConfig: ConfigType<typeof mongodbConfig>): mongoose.Connection => {
            const conn = mongoose.createConnection(dbConfig.uri, {
                //useNewUrlParser: true,
                //useUnifiedTopology: true,
                //see: https://mongoosejs.com/docs/deprecations.html#findandmodify
                //useFindAndModify: false,
            });

            conn.on('disconnect', () => {
                console.log('Disconnecting to MongoDB');
            });

            return conn;
        },
        inject: [mongodbConfig.KEY],
    },
];
