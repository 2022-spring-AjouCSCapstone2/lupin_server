import { Request, Router } from 'express';
import * as courseService from '~/services/courseService';
import * as courseLogService from '~/services/courseLogService';
import * as statisticsService from '~/services/statisticsService';
import { isLoggedIn } from '~/middlewares';

const router = Router();

router.get('/', isLoggedIn, (req, res, next) => {
    // 자신이 듣는 수업 목록 조회
    const { id } = req.user;
    courseService
        .getMyCourses(id)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

router.get('/all', (req, res, next) => {
    // 전체 수업 목록 조회
    courseService
        .getCourses()
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

router.get('/today', isLoggedIn, (req, res, next) => {
    // 오늘 수강하는 수업 목록 조회
    const { id } = req.user;
    courseService
        .getTodayCourses(id)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

router.get(
    '/:courseId/logs',
    isLoggedIn,
    (
        // eslint-disable-next-line @typescript-eslint/ban-types
        req: Request<{ courseId: string }, {}, {}, { day: string }>,
        res,
        next,
    ) => {
        const { courseId } = req.params;
        const { day } = req.query;

        courseLogService
            .getLogsByCourseId(courseId, day)
            .then((data) => {
                res.json(data);
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
            res.json(data);
        })
        .catch(next);
});

export default router;
