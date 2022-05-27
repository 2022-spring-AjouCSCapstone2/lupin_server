import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from '~/dto';

export class SaveCommentRequest extends BaseDto {
    @IsNotEmpty()
    @IsString()
    content!: string;

    @IsNotEmpty()
    @IsNumber()
    postId!: number;
}
