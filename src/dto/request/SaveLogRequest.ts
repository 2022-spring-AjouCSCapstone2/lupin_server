import { plainToInstance } from 'class-transformer';
import { CourseLog } from '~/models';

export class SaveLogRequest {
    roomId!: string;

    type!: string;

    isAnonymous!: boolean;

    content!: string;

    courseId!: string;

    constructor(data: {
        roomId: string;
        type: string;
        isAnonymous: boolean;
        content: string;
        courseId: string;
    }) {
        this.roomId = data.roomId;
        this.type = data.type;
        this.isAnonymous = data.isAnonymous;
        this.content = data.content;
        this.courseId = data.courseId;
    }

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
