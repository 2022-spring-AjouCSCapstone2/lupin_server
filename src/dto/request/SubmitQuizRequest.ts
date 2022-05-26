import { plainToInstance } from 'class-transformer';
import { Quiz, QuizList } from '~/models';

export class SubmitQuizRequest {
    roomId!: string;

    content!: string;

    list!: { no: number; content: string }[];

    answer!: number;

    toEntity(): Quiz {
        const quizList = this.list.map((value) =>
            plainToInstance(QuizList, value),
        );
        const plainAnswer = this.list.find((value) => value.no === this.answer);
        const answer = plainToInstance(QuizList, plainAnswer);
        return plainToInstance(Quiz, {
            content: this.content,
            quitLists: quizList,
            answer,
        });
    }
}
