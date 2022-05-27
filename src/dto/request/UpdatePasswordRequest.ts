import { IsNotEmpty, IsString, Length } from 'class-validator';
import { BaseDto } from '~/dto';

export class UpdatePasswordRequest extends BaseDto {
    @IsNotEmpty()
    @IsString()
    @Length(64, 64)
    password!: string;

    @IsNotEmpty()
    @IsString()
    @Length(64, 64)
    newPassword!: string;
}
