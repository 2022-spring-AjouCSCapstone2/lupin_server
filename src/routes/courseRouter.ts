import { Router } from 'express';
import * as courseService from '~/services/courseService';
import * as courseLogService from '~/services/courseLogService';
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

router.get('/:courseId/logs', isLoggedIn, (req, res, next) => {
    const { courseId } = req.params;

    courseLogService
        .getLogsByCourseId(courseId)
        .then((data) => {
            res.json(data);
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
