import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quiz } from '~/models/Quiz';
import { User } from '~/models/User';

@Entity({ name: 'quiz_logs' })
export class QuizLog {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ default: 0 })
    answer!: number;

    @Column({ default: null })
    isAnswer: boolean;

    @ManyToOne(() => Quiz, (quiz) => quiz.quizLogs)
    quiz!: Quiz;

    @ManyToOne(() => User, (user) => user.quizLogs)
    user!: User;
}
