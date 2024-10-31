import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { TelegramUserService } from '../modules/telegram-user/telegram-user.service';
import { AccessToken } from './interface/access-token.interface';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UserPrincipal } from './interface/user-principal.interface';

@Injectable()
export class AuthService {
    constructor(
        private telegramUserService: TelegramUserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(
        user_name: string,
        telegram_id: string,
    ): Promise<UserPrincipal> {
        const user = await this.telegramUserService.findByUsernameAndTelegramId(
            user_name,
            telegram_id,
        );

        if (!user) {
            throw new UnauthorizedException(
                'user_name or telegram_id is not matched',
            );
        }

        const { id, user_name: username, telegram_id: tgId } = user;
        return {
            id: id,
            telegram_id: tgId,
            user_name: username,
        } as UserPrincipal;
    }

    async validateUserAdmin(
        user_name: string,
        telegram_id: string,
    ): Promise<UserPrincipal> {
        return {
            id: '',
            telegram_id: '',
            user_name: '',
        } as UserPrincipal;
    }

    login(user: UserPrincipal): Observable<AccessToken> {
        const payload: JwtPayload = {
            upn: user.user_name,
            sub: user.id,
            telegram_id: user.telegram_id,
            roles: user.roles,
        };
        return from(this.jwtService.signAsync(payload)).pipe(
            map((access_token) => ({ access_token })),
        );
    }
}
