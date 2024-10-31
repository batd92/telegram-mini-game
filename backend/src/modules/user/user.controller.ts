import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller({ path: '/users' })
export class UserController {
    constructor(private userService: UserService) {}
}
