import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of, throwError } from 'rxjs';
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
    ) { }

    validateUser(user_name: string, telegram_id: string): Observable<UserPrincipal> {
        return this.telegramUserService.findByUsernameAndTelegramId(user_name, telegram_id).pipe(
            mergeMap(user => {
                if (!user) {
                    throw new UnauthorizedException('user_name or telegram_id is not matched');
                }
                const { _id, user_name, telegram_id } = user;
                return of({ id: _id, telegram_id, user_name } as UserPrincipal);
            })
        );
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
