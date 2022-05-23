import { IsEmpty, IsString } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Post } from '~/models';
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { userId, courseId, ...params } = this;
        return plainToInstance(Post, params);
    }
}
