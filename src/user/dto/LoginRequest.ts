import { IsEmail, IsString, Length } from 'class-validator';
import { BaseDto } from '~/utils';

export class LoginRequest extends BaseDto {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @Length(64, 64)
    password: string;
}
