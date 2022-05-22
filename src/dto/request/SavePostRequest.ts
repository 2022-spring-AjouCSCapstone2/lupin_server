import { IsEmpty, IsString } from 'class-validator';
import { Post } from '~/models';
import { plainToInstance } from 'class-transformer';
import { BaseDto } from '../BaseDto';

export class SavePostRequest extends BaseDto {
    @IsString()
    title!: string;

    @IsString()
    content!: string;

    @IsString()
    courseId!: string;

    @IsEmpty()
    userId!: number;

    toEntity(): Post {
        return plainToInstance(Post, this);
    }
}
