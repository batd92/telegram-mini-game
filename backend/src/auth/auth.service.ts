import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of, throwError } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { UserService } from '../modules/user/user.service';
import { AccessToken } from './interface/access-token.interface';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UserPrincipal } from './interface/user-principal.interface';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    validateUser(username: string, telegram_id: string): Observable<UserPrincipal> {
        return this.userService.findUserByTelegramId(username, telegram_id).pipe(
            mergeMap(user => {
                if (!user) {
                    throw new UnauthorizedException('username or telegram_id is not matched');
                }
                const { _id, username, telegram_id } = user;
                return of({ id: _id, telegram_id, username } as UserPrincipal);
            })
        );
    }

    login(user: UserPrincipal): Observable<AccessToken> {
        const payload: JwtPayload = {
            upn: user.username,
            sub: user.id,
            telegram_id: user.telegram_id,
            roles: user.roles,
        };
        return from(this.jwtService.signAsync(payload)).pipe(
            map((access_token) => ({ access_token })),
        );
    }
}
