import { Router } from 'express';
import * as courseService from '~/services/courseService';
// class router의 자리 : class 관련 API가 이 router 안에 들어갑니다.
// - 자신이 듣는 수업 목록 조회
// - 전체 수업 목록 조회
// - 특정 수업 정보 조회 (수강번호 기준 (X123))

const router = Router();

router.get('/', (req, res) => {
    // 자신이 듣는 수업 목록 조회
});

router.get('/all', (req, res) => {
    // 전체 수업 목록 조회
});

router.get('/:courseId', (req, res) => {
    // 특정 수업 정보 조회 (수강번호 기준 X123)
});

export default router;
