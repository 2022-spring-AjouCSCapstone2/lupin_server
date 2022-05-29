import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '~/models/Course';
import { User } from '~/models/User';

@Entity({ name: 'statistics' })
export class Statistics {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ default: 0 })
    midtermExamScore!: number;

    @Column({ default: 0 })
    finalExamScore!: number;

    @Column({ default: 0 })
    quizScore!: number;

    @ManyToOne(() => Course)
    course!: Course;

    @ManyToOne(() => User)
    user!: User;
}
