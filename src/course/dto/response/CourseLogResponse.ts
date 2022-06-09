import { CourseLog } from '~/models';

export class CourseLogResponse {
    id!: number;

    type!: string;

    recordKey!: string;

    script!: string;

    content!: string;

    summary!: string;

    isAnonymous!: boolean;

    point!: boolean;

    createdAt!: Date;

    constructor(courseLog: CourseLog) {
        this.id = courseLog.id;
        this.type = courseLog.type;
        this.recordKey = courseLog.recordKey;
        this.script = courseLog.script;
        this.content = courseLog.content;
        this.summary = courseLog.summary;
        this.isAnonymous = courseLog.isAnonymous;
        this.point = courseLog.point;
        this.createdAt = courseLog.createdAt;
    }
}
