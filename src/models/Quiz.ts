import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizList } from '~/models/QuizList';
import { QuizLog } from '~/models/QuizLog';

@Entity({ name: 'quiz' })
export class Quiz {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ default: null })
    content!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @OneToMany(() => QuizList, (quizList) => quizList.quiz)
    quizLists!: QuizList[];

    @OneToOne(() => QuizList, (quizList) => quizList.target)
    answer!: QuizList;

    @OneToMany(() => QuizLog, (log) => log.quiz)
    quizLogs!: QuizLog[];
}
