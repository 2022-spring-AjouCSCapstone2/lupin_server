import { quizLogRepository } from '~/repositories';
import { QuizLog } from '~/models/QuizLog';
import { getUserById, getQuizById } from '~/services';

export const saveQuizLog = async (params: {
    answer: number;
    isAnswer: boolean;
    userId: number;
    quizId: number;
}) => {
    const user = await getUserById(params.userId);
    const quiz = await getQuizById(params.quizId);

    const entity = new QuizLog();

    entity.isAnswer = params.isAnswer;
    entity.answer = params.answer;

    entity.user = user;
    entity.quiz = quiz;

    return quizLogRepository.save(entity);
};
