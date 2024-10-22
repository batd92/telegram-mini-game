import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { USER_MODEL } from '../database/constants';
import { RoleType } from '../shared/enum/role-type.enum';
import { User } from '../database/schemas/user.schema';

@Injectable()
export class DataInitializerService implements OnModuleInit {
    constructor(@Inject(USER_MODEL) private userModel: Model<User>) { }

    public users: User[] = [];

    async onModuleInit(): Promise<void> {
        console.log('(UserModule) is initialized...');
        if (process.env.IS_PRODUCT == 'true') {
            await this.userModel.deleteMany({});
        }
    }
}
