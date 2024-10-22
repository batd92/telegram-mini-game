import { registerAs } from '@nestjs/config';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mini-game';

export default registerAs('mongodb', () => ({
    uri: MONGODB_URI,
}));
