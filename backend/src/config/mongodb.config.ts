import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
    uri:
        process.env.DATABASE_URL ||
        'mongodb://mongo1:27017,mongo2:27018,mongo3:27019/you_database?replicaSet=rs0',
}));
