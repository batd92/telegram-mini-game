import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { TelegramUserService } from './telegram-user.service';
import { HasRoles } from 'auth/guard/has-roles.decorator';
import { RoleType } from 'shared/enum/role-type.enum';
import { IMe } from './dto/IMe';

@Controller({ path: "/user-telegram" })
export class TelegramUserController {

    constructor(private telegramUserService: TelegramUserService) { }

    @UseGuards(JwtAuthGuard)
    @HasRoles(RoleType.USER)
    @Get('me')
    getUser(@Req() req: any): Promise<{ data: IMe }> {
        const user = req.user as { id: string };
        return this.telegramUserService.findByUserId(user.id);
    }

    @UseGuards(JwtAuthGuard)
    @HasRoles(RoleType.USER)
    @Get('verify-token')
    async isToken(@Req() req: any): Promise<any> {
        return {
            status: 'ok',
        };
    }
}
