import { IsEmail, IsIn, IsNumber, IsString, Length } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { User } from '~/models';
import { BaseDto } from '~/utils';

export class JoinRequest extends BaseDto {
    @IsString()
    name: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @Length(64, 64)
    password: string;

    @IsNumber()
    userId: number;

    @IsIn(['STUDENT', 'PROFESSOR'])
    @IsString()
    userType: string;

    public toEntity() {
        return plainToInstance(User, this);
    }
}
