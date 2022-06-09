import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from '~/utils';

export class SaveCommentRequest extends BaseDto {
    @IsNotEmpty()
    @IsString()
    content!: string;

    @IsNotEmpty()
    @IsNumber()
    postId!: number;
}
