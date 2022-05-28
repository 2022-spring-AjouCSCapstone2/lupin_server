import { SubmitQuizRequest } from '~/dto';
import { quizRepository } from '~/repositories';
import { getCourseByCourseId } from '~/services/courseService';

export const saveQuiz = async (params: SubmitQuizRequest) => {
    const { roomId } = params;

    const courseId = roomId.split('-')[0];

    const course = await getCourseByCourseId(courseId);
    const entity = params.toEntity();

    entity.course = course;
    return quizRepository.save(entity);
};

export const getQuizById = (id: number) => {
    return quizRepository.findOne({
        where: { id },
        relations: ['answer', 'course'],
    });
};
