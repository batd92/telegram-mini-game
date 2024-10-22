import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
    secretKey: process.env.JWT_SECRET_KEY || 'apt92-minigame',
    expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
}));
