import { plainToInstance } from 'class-transformer';
import { Quiz, QuizList } from '~/models';

export class SubmitQuizRequest {
    roomId!: string;

    content!: string;

    list!: { no: number; content: string }[];

    answer!: number;

    constructor(data: {
        roomId: string;
        content: string;
        list: { no: number; content: string }[];
        answer: number;
    }) {
        this.roomId = data.roomId;
        this.content = data.content;
        this.list = data.list;
        this.answer = data.answer;
    }

    toEntity(): Quiz {
        const quizLists = this.list.map((value) =>
            plainToInstance(QuizList, value),
        );
        const plainAnswer = this.list.find((value) => value.no === this.answer);
        const answer = plainToInstance(QuizList, plainAnswer);
        return plainToInstance(Quiz, {
            content: this.content,
            quizLists,
            answer,
        });
    }
}
