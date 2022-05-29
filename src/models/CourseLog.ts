import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { courseLogType } from '~/config';
import { Course } from '~/models/Course';
import { User } from '~/models/User';

@Entity({ name: 'course_logs' })
export class CourseLog {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ type: 'enum', enum: courseLogType })
    type!: courseLogType;

    // 녹음 파일 저장된 경로의 Key
    @Column({ nullable: true })
    recordKey!: string;

    // 스크립트 데이터
    @Column({ nullable: true })
    script!: string;

    // 질문 내용
    @Column({ nullable: true })
    content!: string;

    @Column({ nullable: true })
    summary!: string;

    @Column({ default: true })
    isAnonymous!: boolean;

    @Column({ default: null })
    point!: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @ManyToOne(() => Course, (course) => course.courseLogs, { cascade: true })
    course!: Course;

    @ManyToOne(() => User, (user) => user.logs)
    user!: User;
}
