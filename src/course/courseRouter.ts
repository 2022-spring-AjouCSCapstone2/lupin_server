import { Request, Router } from 'express';
import * as courseService from '~/course/service/courseService';
import * as courseLogService from '~/course/service/courseLogService';
import * as statisticsService from '~/course/service/statisticsService';
import { isLoggedIn } from '~/middlewares';
import { uploaderMiddleware } from '~/middlewares/uploaderMiddleware';
import {
    CourseLogResponse,
    CourseResponse,
    GetCourseLogQuery,
} from '~/course/dto';

const router = Router();

router.get('/', isLoggedIn, (req, res, next) => {
    // 자신이 듣는 수업 목록 조회
    const { id, userType } = req.user;
    courseService
        .getMyCourses(id, userType)
        .then((data) => {
            res.json(data.map((course) => new CourseResponse(course)));
        })
        .catch(next);
});

router.get('/all', (req, res, next) => {
    // 전체 수업 목록 조회
    courseService
        .getCourses()
        .then((data) => {
            res.json(data.map((course) => new CourseResponse(course)));
        })
        .catch(next);
});

router.get('/today', isLoggedIn, (req, res, next) => {
    // 오늘 수강하는 수업 목록 조회
    const { id, userType } = req.user;
    courseService
        .getTodayCourses(id, userType)
        .then((data) => {
            res.json(data.map((course) => new CourseResponse(course)));
        })
        .catch(next);
});

router.get(
    '/:courseId/logs',
    isLoggedIn,
    (
        // eslint-disable-next-line @typescript-eslint/ban-types
        req: Request<{ courseId: string }, {}, {}, GetCourseLogQuery>,
        res,
        next,
    ) => {
        const { courseId } = req.params;

        courseLogService
            .getLogsByCourseId(courseId, req.query)
            .then((data) => {
                res.json(
                    data.map((courseLog) => new CourseLogResponse(courseLog)),
                );
            })
            .catch(next);
    },
);

router.get('/:courseId/statistics', isLoggedIn, (req, res, next) => {
    const { userId } = req.user;
    const { courseId } = req.params;

    statisticsService
        .getStatisticsByCourseId(courseId, userId)
        .then((data) => {
            const averageMidtermScore =
                data.reduce((prev, curr) => {
                    return prev + curr.midtermExamScore;
                }, 0) / data.length;
            const averageFinalScore =
                data.reduce((prev, curr) => {
                    return prev + curr.finalExamScore;
                }, 0) / data.length;
            const averageQuizScore =
                data.reduce((prev, curr) => {
                    return prev + curr.quizScore;
                }, 0) / data.length;
            res.json({
                averageMidtermScore,
                averageFinalScore,
                averageQuizScore,
                data,
            });
        })
        .catch(next);
});

router.get('/:courseId', (req, res, next) => {
    // 특정 수업 정보 조회 (수강번호 기준 X123)
    const { courseId } = req.params;
    courseService
        .getCourseByCourseId(courseId)
        .then((data) => {
            if (!data) {
                res.json({ status: 404, message: 'not found' });
            }
            res.json(new CourseResponse(data));
        })
        .catch(next);
});

router.post(
    '/:courseId/logs',
    isLoggedIn,
    uploaderMiddleware.single('audio'),
    (req, res, next) => {
        const { courseId } = req.params;

        const { location } = req.file;

        courseLogService
            .saveRecording(location, req.file, courseId)
            .then(() => {
                res.json({
                    message:
                        'Successfully uploaded recorded audio... Script will be added by server.',
                });
            })
            .catch(next);
    },
);

export default router;
