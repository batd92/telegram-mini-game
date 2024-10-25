import { Inject, Injectable } from '@nestjs/common';
import { USER_MODEL } from '../../database/constants';
import { Model } from 'mongoose';
import { User, UserDocument } from 'database/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_MODEL) private userModel: Model<UserDocument>,

    ) { }

    async findByUserId(id: string): Promise<Partial<User>> {
        return this.userModel.findOne({ _id: id }).exec()
    }    
}
