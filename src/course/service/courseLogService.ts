import {
    courseLogRepository,
    getCourseByCourseId,
    SaveLogRequest,
} from '~/course';
import { getUserById } from '~/user';
import { CourseLog } from '~/models';
import { NotFoundError, createInstance, BadRequestError } from '~/utils';
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

export const getLogsByCourseId = (
    courseId: string,
    params?: { day?: string; type?: string },
) => {
    const query = courseLogRepository
        .createQueryBuilder('log')
        .leftJoinAndSelect('log.course', 'course')
        .where('course.course_id = :courseId', { courseId });
    if (params.day) {
        const y = +params.day.substring(0, 4);
        const m = +params.day.substring(4, 6);
        const d = +params.day.substring(6, 8);
        console.log(y, m, d);
        const start = new Date(y, m - 1, d);
        const end = new Date(y, m - 1, d + 1);
        query.andWhere('log.created_at >= :start', { start });
        query.andWhere('log.created_at <= :end', { end });
    }
    if (params.type) {
        query.andWhere('log.type = :type', { type: params.type });
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

export const saveRecording = async (
    savedPath: string,
    audio: Express.Multer.File,
    courseId: string,
) => {
    const recordLog = new CourseLog();
    const scriptLog = new CourseLog();
    const summaryLog = new CourseLog();

    const course = await getCourseByCourseId(courseId);

    if (!course) {
        throw new NotFoundError('course not found');
    }
    recordLog.course = course;
    recordLog.type = courseLogType.RECORDING;
    recordLog.recordKey = savedPath;

    const instance = createInstance();

    instance
        .post('/path', {
            path: audio.location,
            filename: audio.originalname,
        })
        .then((response) => {
            if (!response) {
                throw new BadRequestError('Failed to connect AI server');
            }
            console.log(response.status);
            console.log(response.data);

            const data = response.data;

            if (response.status !== 200 || !data) {
                throw new BadRequestError('Failed to translate audio');
            }

            if (!data.file_name || !data.STT_text || !data.Sum_text) {
                throw new BadRequestError('Failed to translate audio');
            }

            scriptLog.course = course;
            scriptLog.type = courseLogType.SCRIPT;
            scriptLog.script = data.STT_text;

            summaryLog.course = course;
            summaryLog.type = courseLogType.SUMMARY;
            summaryLog.summary = data.Sum_text;

            return courseLogRepository.save([recordLog, scriptLog, summaryLog]);
        })
        .catch((err) => console.log(err));
};
