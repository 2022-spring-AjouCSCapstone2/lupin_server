import { Course, Timetable, User } from '~/models';

export class CourseResponse {
    id!: number;

    name!: string;

    courseId!: string;

    professor!: User;

    timetables!: Timetable[];

    constructor(course: Course) {
        this.id = course.id;
        this.name = course.name;
        this.courseId = course.courseId;
        this.professor = course.professor;
        this.timetables = course.timetables;
    }
}
