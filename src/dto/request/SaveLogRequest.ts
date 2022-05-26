import { plainToInstance } from 'class-transformer';
import { CourseLog } from '~/models';

export class SaveLogRequest {
    roomId!: string;

    type!: string;

    isAnonymous!: boolean;

    content!: string;

    courseId!: string;

    public toEntity() {
        if (
            !['QUESTION', 'RECORDING', 'SCRIPT'].includes(this.type) ||
            !this.content
        ) {
            throw new Error('Invalid parameter');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { courseId, roomId, ...params } = this;
        return plainToInstance(CourseLog, params);
    }
}
