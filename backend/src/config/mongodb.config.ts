import { registerAs } from '@nestjs/config';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/my_database';

export default registerAs('mongodb', () => ({
    uri: MONGODB_URI,
}));
