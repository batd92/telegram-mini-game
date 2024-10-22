import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { AuthController } from './auth.controller';
import * as session from 'express-session';
import * as passport from 'passport';
import { SessionSerializer } from './session.serializer';

@Module({
    imports: [
        ConfigModule.forFeature(jwtConfig),
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt', session: true }),
        JwtModule.registerAsync({
            imports: [ConfigModule.forFeature(jwtConfig)],
            useFactory: (config: ConfigType<typeof jwtConfig>) => {
                return {
                    secret: config.secretKey,
                    signOptions: { expiresIn: config.expiresIn },
                } as JwtModuleOptions;
            },
            inject: [jwtConfig.KEY],
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, SessionSerializer],
    exports: [AuthService],
    controllers: [AuthController],
})

export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                session({
                    secret: 'rzxlszyykpbgqcflzxsqcysyhljt',
                    resave: false,
                    saveUninitialized: false,
                    cookie: {
                        sameSite: true,
                        httpOnly: false,
                        maxAge: 60000,
                    }
                }),
                passport.initialize(),
                passport.session(),
            )
            .forRoutes('*');
    }
}
