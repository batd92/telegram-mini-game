export class UserDto {
    readonly id: string;
    readonly username: string;
    readonly telegram_id: string;
    readonly referrer_user?: string; 
    readonly name?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
