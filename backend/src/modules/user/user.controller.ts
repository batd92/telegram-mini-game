import { Controller, DefaultValuePipe, Get, Param, Query, UseGuards } from '@nestjs/common';
import { User } from '../../database/schemas/user.schema';
import { Observable } from 'rxjs';
import { ParseObjectIdPipe } from '../../shared/pipe/parse-object-id.pipe';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Controller({ path: "/users" })
export class UserController {

    constructor(private userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUser(
        @Param('id', ParseObjectIdPipe) id: string
    ): Promise<User> {
        return this.userService.findByUserId(id);
    }
}
