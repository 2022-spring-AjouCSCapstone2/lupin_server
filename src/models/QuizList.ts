import {
    Column,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Quiz } from '~/models/Quiz';

@Entity({ name: 'quiz_lists' })
export class QuizList {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ unsigned: true, default: 0 })
    no!: number;

    @Column({ default: null })
    content!: string;

    @ManyToOne(() => Quiz, (quiz) => quiz.quizLists)
    quiz!: Quiz;

    @OneToOne(() => Quiz, (quiz) => quiz.answer)
    target!: Quiz;
}
