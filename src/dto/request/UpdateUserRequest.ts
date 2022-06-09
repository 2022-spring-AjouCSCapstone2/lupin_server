import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '~/dto';

export class UpdateUserRequest extends BaseDto {
    @IsNotEmpty()
    @IsString()
    phone!: string;
}
