import {
    SubmitQuizRequest,
    quizRepository,
    getCourseByCourseId,
} from '~/course';

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
