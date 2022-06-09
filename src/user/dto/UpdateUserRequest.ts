import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '~/utils';

export class UpdateUserRequest extends BaseDto {
    @IsNotEmpty()
    @IsString()
    phone!: string;
}
