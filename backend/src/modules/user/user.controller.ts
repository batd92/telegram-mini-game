import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ParseObjectIdPipe } from '../../shared/pipe/parse-object-id.pipe';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { User } from 'database/schemas/user.schema';

@Controller({ path: "/users" })
export class UserController {

    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUser(
        @Param('id', ParseObjectIdPipe) id: string
    ): Promise<Partial<User>> {
        return this.userService.findByUserId(id);
    }
}
