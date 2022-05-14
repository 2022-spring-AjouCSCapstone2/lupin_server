import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { courseLogType } from '~/config';
import { Course } from '~/models/Course';

@Entity({ name: 'course_logs' })
export class CourseLog {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ type: 'enum', enum: courseLogType })
    type!: courseLogType;

    // 녹음 파일 저장된 경로의 Key
    @Column()
    recordKey!: string;

    // 스크립트 데이터
    @Column()
    script!: string;

    // 질문 내용
    @Column()
    content!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @ManyToOne(() => Course, (course) => course.courseLogs, { cascade: true })
    course!: Course;
}
