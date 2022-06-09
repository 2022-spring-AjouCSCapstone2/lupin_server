import express from 'express';

import userRouter from '~/user/userRouter';
import courseRouter from '~/course/courseRouter';
import postRouter from '~/post/postRouter';

const router = express.Router();

router.use('/users', userRouter);
router.use('/courses', courseRouter);
router.use('/posts', postRouter);

export default router;
