import { statisticsRepository } from '~/repositories';
import { UpdateStatisticsRequest } from '~/dto';
import { getCourseByCourseId } from '~/services/courseService';
import { BadRequestError } from '~/utils';
import { Statistics } from '~/models';
import { getUserByUserId } from '~/services/userService';

export const updateStatistics = async (
    courseId: string,
    userId: number,
    param: UpdateStatisticsRequest,
) => {
    const statistics = await statisticsRepository.findOne({
        where: { course: { courseId }, user: { userId } },
        relations: ['course', 'user'],
    });

    if (!statistics) {
        const newStatistics = new Statistics();

        const user = await getUserByUserId(userId);
        const course = await getCourseByCourseId(courseId);

        if (param.midtermExamScore) {
            newStatistics.midtermExamScore = param.midtermExamScore;
        }
        if (param.finalExamScore) {
            newStatistics.finalExamScore = param.finalExamScore;
        }
        if (param.quizScore) {
            newStatistics.quizScore = param.quizScore;
        }

        newStatistics.user = user;
        newStatistics.course = course;

        return statisticsRepository.save(newStatistics);
    }
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
