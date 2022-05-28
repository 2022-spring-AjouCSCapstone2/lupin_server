import { courseLogRepository } from '~/repositories';
import { SaveLogRequest } from '~/dto';
import { getUserById } from '~/services/userService';
import { getCourseByCourseId } from '~/services/courseService';

export const saveLog = async (data: SaveLogRequest, userId: number) => {
    const entity = data.toEntity();

    const user = await getUserById(userId);

    if (!user) {
        throw new Error('User does not exist');
    }

    const course = await getCourseByCourseId(data.courseId);

    if (!course) {
        throw new Error('Course does not exist');
    }

    entity.course = course;
    entity.user = user;

    return courseLogRepository.save(entity);
};

export const getLogById = (id: number) => {
    return courseLogRepository.findOne({ where: { id } });
};

export const getLogsByCourseId = (courseId: string) => {
    return courseLogRepository.find({
        where: { course: { courseId } },
        relations: ['course'],
    });
};

export const updatePoint = async (data: { logId: number; point: boolean }) => {
    const log = await courseLogRepository.findOne({
        where: { id: data.logId },
    });
    log.point = data.point;

    return courseLogRepository.save(log);
};
