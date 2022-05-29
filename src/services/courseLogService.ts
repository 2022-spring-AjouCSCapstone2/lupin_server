import { courseLogRepository } from '~/repositories';
import { SaveLogRequest } from '~/dto';
import { getUserById } from '~/services/userService';
import { getCourseByCourseId } from '~/services/courseService';
import { CourseLog } from '~/models';
import { NotFoundError } from '~/utils';
import { courseLogType } from '~/config';

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

export const getLogsByCourseId = (courseId: string, day?: string) => {
    const query = courseLogRepository
        .createQueryBuilder('log')
        .leftJoinAndSelect('log.course', 'course')
        .where('course.course_id = :courseId', { courseId });
    if (day) {
        const y = +day.substring(0, 4);
        const m = +day.substring(4, 6);
        const d = +day.substring(6, 8);
        console.log(y, m, d);
        const start = new Date(y, m - 1, d);
        const end = new Date(y, m - 1, d + 1);
        query.andWhere('log.created_at >= :start', { start });
        query.andWhere('log.created_at <= :end', { end });
    }
    return query.getMany();
};

export const updatePoint = async (data: { logId: number; point: boolean }) => {
    const log = await courseLogRepository.findOne({
        where: { id: data.logId },
    });
    log.point = data.point;

    return courseLogRepository.save(log);
};

export const saveRecording = async (savedPath: string, courseId: string) => {
    const log = new CourseLog();
    const course = await getCourseByCourseId(courseId);

    if (!course) {
        throw new NotFoundError('course not found');
    }
    log.course = course;
    log.type = courseLogType.RECORDING;
    log.recordKey = savedPath;

    return courseLogRepository.save(log);
};
