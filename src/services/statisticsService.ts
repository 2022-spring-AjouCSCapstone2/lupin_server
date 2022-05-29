import { statisticsRepository } from '~/repositories';
import { UpdateStatisticsRequest } from '~/dto';
import { getCourseByCourseId } from '~/services/courseService';
import { BadRequestError } from '~/utils';

export const updateStatistics = async (
    courseId: string,
    userId: number,
    param: UpdateStatisticsRequest,
) => {
    const statistics = await statisticsRepository.findOne({
        where: { course: { courseId }, user: { userId } },
        relations: ['course', 'user'],
    });

    if (param.midtermExamScore) {
        statistics.midtermExamScore = param.midtermExamScore;
    }
    if (param.finalExamScore) {
        statistics.finalExamScore = param.finalExamScore;
    }
    if (param.quizScore) {
        statistics.quizScore += param.quizScore;
    }

    return statisticsRepository.save(statistics);
};

export const getStatisticsByCourseId = async (
    courseId: string,
    userId: number,
) => {
    const course = await getCourseByCourseId(courseId);

    if (!course || course.professor.userId !== userId) {
        throw new BadRequestError('Improper input');
    }

    return statisticsRepository.find({
        where: { course: { courseId } },
        relations: ['user'],
    });
};
