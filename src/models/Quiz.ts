import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizList } from '~/models/QuizList';
import { QuizLog } from '~/models/QuizLog';
import { Course } from '~/models/Course';

@Entity({ name: 'quiz' })
export class Quiz {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ default: null })
    content!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @OneToMany(() => QuizList, (quizList) => quizList.quiz, { cascade: true })
    quizLists!: QuizList[];

    @OneToOne(() => QuizList, (quizList) => quizList.target, { cascade: true })
    answer!: QuizList;

    @OneToMany(() => QuizLog, (log) => log.quiz)
    quizLogs!: QuizLog[];

    @ManyToOne(() => Course, (course) => course.quiz)
    course!: Course;
}
