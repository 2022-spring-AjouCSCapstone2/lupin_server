import { SubmitQuizRequest } from '~/dto';
import { quizRepository } from '~/repositories';

export const saveQuiz = (params: SubmitQuizRequest) => {
    const entity = params.toEntity();

    return quizRepository.save(entity);
};

export const getQuizById = (id: number) => {
    return quizRepository.findOne({ where: { id }, relations: ['answer'] });
};
