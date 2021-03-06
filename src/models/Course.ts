import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '~/models/User';
import { CourseLog } from '~/models/CourseLog';
import { Post } from '~/models/Post';
import { Timetable } from '~/models/Timetable';
import { Quiz } from '~/models/Quiz';

@Entity({ name: 'courses' })
export class Course {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    courseId!: string;

    @Column()
    openingTime!: string;

    @Column()
    closingTime!: string;

    @ManyToOne(() => User, (user) => user.lectures, { cascade: true })
    professor: User;

    @ManyToMany(() => User, (user) => user.courses, { cascade: true })
    students: User[];

    @OneToMany(() => CourseLog, (courseLog) => courseLog.course, {
        onDelete: 'CASCADE',
    })
    courseLogs: CourseLog[];

    @OneToMany(() => Post, (post) => post.course, { onDelete: 'CASCADE' })
    posts!: Post[];

    @OneToMany(() => Timetable, (timetable) => timetable.course, {
        onDelete: 'CASCADE',
    })
    timetables: Timetable[];

    @OneToMany(() => Quiz, (quiz) => quiz.course, { cascade: true })
    quiz!: Quiz[];
}
